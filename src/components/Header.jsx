'use client'
import React, {useState, useContext, useEffect} from "react"
import { getCurrentUser } from "../lib/auth";
import { removeCookie, getUsername, removeUsername } from "@/utlis/cookies";
import NavBar from "../components/NavBar"
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { searchResult } from "../store/searchSlice"
import UserContext from "../context/UserContext"
import Link from "next/link";

function Header() {
  const [query, setQuery] = useState("");
  const {searchPage, setSearchPage} = useContext(UserContext)
  const [username, setUsernameState] = useState("");
  const router = useRouter();
  const dispatch = useDispatch()
  

  const logoutHandler = () => {
    removeCookie("accessToken");
    removeUsername("username");
    router.push("/Login");
  }

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      const googleUsername = getUsername("username");
      
      if (user || googleUsername) {
        setUsernameState(user.Username || googleUsername);
      } else {
        router.push("/Login");
      }
    };

    fetchUser();
  }, []);

  const searchMovies = async (query) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4638fd7e1f9a447f699d14ff279cf2b4&query=${query}&page=${searchPage}`);
      const data = await response.json();
      dispatch(searchResult(data.results));
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      e.preventDefault();
      setSearchPage(1);
      searchMovies(query);
    }
  }

  useEffect (() => {
    if(query){
      searchMovies(query)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchPage])


  return (
    <div className="bg-transparent">
      <div className="pt-[25px] pb-[30px] text-white">
        <div>
          <div className="flex justify-between w-[1080px] mx-auto">
            <div className="logo">
              <img src="/Logo.png" alt="Logo" className="w-[90px]" />
            </div>
            <div className="flex justify-between w-[38%] mt-[20px]">
              <div className="rounded-full w-[90%] h-[40px] border ">
                <input type="text" placeholder="Search for movies..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} disabled={!username} className="mt-[7px] mx-[8px] w-[85%] pr-[2px] outline-0 px-[5px]" />
                {query.length > 0 ? 
                  <button onClick={() => {
                    setQuery("")
                    dispatch(searchResult([]))
                  }} className="cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
                  : 
                  <button onClick={() => {
                    searchMovies(query)
                    setSearchPage(1)
                    }} className="cursor-pointer"><i className="fa-solid fa-magnifying-glass"></i></button>}
              </div>
              <p className="mt-[-2px] text-center mx-[0px]">{username ? `Welcome ${username}!` : "Welcome Guest!"}</p>
              {username ? <button onClick={logoutHandler} className='h-0 mt-[6px] ml-[5px] cursor-pointer'>Logout</button> : <Link href={"/login"} className="h-0 mt-[6px] ml-[5px] cursor-pointer">Login</Link>}
            </div>
          </div>
          <div>
            <NavBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
