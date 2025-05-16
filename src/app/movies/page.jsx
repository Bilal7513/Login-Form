'use client'
import React, { useEffect, useState, useContext } from 'react'
import useAllMoviesApi from '@/hooks/useAllMoviesApi'
import MovieCard from '@/components/MovieCard';
import MovieDetails from '@/components/MovieDetails';
import { useSelector } from 'react-redux'
import UserContext from '@/context/UserContext'

function AllMovies() {
  const [page, setPage] = useState(1);
  const {movies} = useAllMoviesApi(page)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const searchResult = useSelector((state) => state.search.results)
  const isSearching = searchResult.length > 0;
  const displayMovie = isSearching ? searchResult : movies;
  const {searchPage, setSearchPage} = useContext(UserContext)

  const pageUp = () => {
    if(isSearching){
      if(searchPage < 5){
        setSearchPage(searchPage + 1)
      }
    } else {
      if(page < 5){
        setPage(page + 1)
      }
    }
  }

  const pageDown = () => {
    if(isSearching){
      if(searchPage > 1){
        setSearchPage(searchPage - 1)
      }
    } else {
      if(page > 1){
        setPage(page - 1)
      }
    }
  }
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, selectedMovie, searchPage]);

  return (
    <div className='text-white bg-[#181d2b]'>
      {selectedMovie ?
        <div className='bg-[url(/hero-area.png)] bg-no-repeat bg-cover bg-top pt-[200px] pb-[20px] mt-[-160px]'>
          <MovieDetails movie={selectedMovie} onClose={() => {
            setSelectedMovie(null)
            }} />
        </div>
        :
        <>
          <div className='px-[28px] pb-[25px] bg-[url(/titl-bg.png)] bg-no-repeat bg-top pt-[220px] mt-[-150px]'>
            {isSearching ? 
              <div className='w-[1200px] mx-auto pt-[100px]'>
                <p className='border-b-2 border-white text-5xl text-white pb-5 mb-[60px]'><i className="icofont icofont-movie text-[#fece50]"></i> Search Results</p>
              </div> : 
              <h1 className='text-[65px] text-center mb-[220px]'>Movies</h1>
            }
            <div className='grid grid-cols-4 gap-7 mx-auto w-[1200px]'>
              {displayMovie.map((movie)=>(
                <MovieCard key={movie.id} className={'h-[420px]'} movie={movie} onClick={() => {
                  setSelectedMovie(movie)
                }}/>
              ))}
            </div>
            <div className='text-center flex justify-center pt-[20px] text-[18px]'>
              <button onClick={pageDown} className='cursor-pointer'><i className="fa-solid fa-angles-left"></i></button>
              <p className='mx-[8px] '>{isSearching ? searchPage : page}</p>
              <button onClick={pageUp} className='cursor-pointer'><i className="fa-solid fa-angles-right"></i></button>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default AllMovies