"use client"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../lib/auth";
import { removeCookie, getUsername, removeUsername } from "@/utlis/cookies";

export default function Home() {
  const [username, setUsernameState] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      const googleUsername = getUsername("username");
      // console.log(getUsername("username"));
      
      // console.log(user);
      
      if (user || googleUsername) {
        setUsernameState(user.Username || googleUsername);
      } else {
        router.push("/Login");
      }
    };

    fetchUser();
  }, []);

  function logout() {
    removeCookie("accessToken");
    removeUsername("username");
    router.push("/Login");

  }
  return (
    <div className='h-screen flex flex-col items-center bg-[url(/hero-area.png)] bg-no-repeat bg-top'>
      <div className='flex flex-col w-[600px] mx-auto text-center pb-[50px] pt-[100px]'>
        <p className='border-b-2 border-white text-5xl text-white pb-5'>Welcome {username}</p>
      </div>
      <button className='bg-white outline-0 text-black rounded-2xl w-[40%] mt-4 px-8 py-2 text-lg font-medium cursor-pointer' onClick={logout}>Logout</button>
    </div>
  );
}
