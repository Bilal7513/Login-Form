"use client"; 
import React, { useContext } from "react";
import MovieCard from '../components/MovieCard'
import useSectionApi from '../hooks/useSectionApi'
import Hero from '../components/Hero'
import MovieDetails from '../components/MovieDetails'
import { useSelector } from 'react-redux'
import UserContext from '../context/UserContext'

export default function Home() {
  const {movies} = useSectionApi()
  const allMovies = movies.slice(0, 16)
  const [selectedMovie, setSelectedMovie] = React.useState(null)
  const searchResult = useSelector((state) => state.search.results)
  const isSearching = searchResult.length > 0;
  const displayMovie = isSearching ? searchResult : allMovies;
  const {searchPage, setSearchPage} = useContext(UserContext)

  const pageUp = () => {
    if(searchPage < 5){
      setSearchPage(searchPage + 1)
    }
  }

  const pageDown = () => {
    if(searchPage > 1){
      setSearchPage(searchPage - 1)
    }
  }

  return (
    <div className='bg-[#181d2b] text-white'>
      {selectedMovie ?
        <div className='bg-[url(/hero-area.png)] bg-no-repeat bg-cover bg-top pt-[200px] pb-[20px] mt-[-160px]'>
          <MovieDetails movie={selectedMovie} onClose={() => {
            setSelectedMovie(null)
            window.scrollTo({ top: 0, behavior: "smooth" });
            }} />
        </div>
        :
        <>
          {isSearching ? 
            <div className='px-[28px] pb-[25px] bg-[url(/titl-bg.png)] bg-no-repeat bg-top pt-[220px] mt-[-150px]'>
              <div className='flex flex-col w-[1200px] mx-auto pb-[50px] pt-[100px]'>
                <p className='border-b-2 border-white text-5xl text-white pb-5 mb-[60px]'>
                  <i className="icofont icofont-movie text-[#fece50]"></i> {isSearching ? 'Search Results' : 'Spotlight This Week'}</p>
                <div className='grid grid-cols-4 gap-7'>
                  {displayMovie.map((movie)=>(
                    <MovieCard key={movie.id} className={"h-[400px]"} movie={movie} onClick={() => {
                      setSelectedMovie(movie)
                      window.scrollTo({ top: 150, behavior: "smooth" });
                    }}/>
                  ))}
                </div>
                <div className='text-center flex justify-center pt-[20px] text-[18px]'>
                  <button onClick={pageDown} className='cursor-pointer'><i className="fa-solid fa-angles-left"></i></button>
                  <p className='mx-[8px]'>{searchPage}</p>
                  <button onClick={pageUp} className='cursor-pointer'><i className="fa-solid fa-angles-right"></i></button>
                </div> 
              </div>
            </div> :
            <div>
              <Hero />
              <div className='flex flex-col w-[1200px] mx-auto pb-[50px] pt-[100px]'>
                <p className='border-b-2 border-white text-5xl text-white pb-5 mb-[60px]'>
                <i className="icofont icofont-movie text-[#fece50]"></i> {isSearching ? 'Search Results' : 'Spotlight This Week'}</p>
                <div className='grid grid-cols-4 gap-7'>
                  {displayMovie.map((movie)=>(
                    <MovieCard key={movie.id} className={"h-[400px]"} movie={movie} onClick={() => {
                      setSelectedMovie(movie)
                      window.scrollTo({ top: 150, behavior: "smooth" });
                    }}/>
                  ))}
                </div>
              </div>
            </div>
          }
        </>
      }
    </div>
  );
}
