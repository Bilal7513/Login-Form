import React, { useState } from 'react'
import sliderApi from '../hooks/useSliderApi'

function Hero() {
  const [i, setI] = useState(0)
  const [j, setJ] = useState(1)
  const {movies} = sliderApi()

  const sliderPrev = movies.slice(i - 1, j - 1)
  const sliderCenter = movies.slice(i, j)
  const sliderNext = movies.slice(i + 1, j + 1)
  // console.log(sliderCenter);

  const getStars = (vote) => {
    if (vote < 2) return "⭐";
    if (vote < 4) return "⭐⭐";
    if (vote < 6) return "⭐⭐⭐";
    if (vote < 8) return "⭐⭐⭐⭐";
    if (vote >= 8) return "⭐⭐⭐⭐⭐";
  };
  
  

  const showNext = () => {
    if (i < 5 && j < 6) {
      setI(i + 1)
      setJ(j + 1)
      console.log(i, j);
    } else {
      setI(0)
      setJ(1)
      console.log(false , "Next");
    }
  }
    
  const showPrev = () => {
    if (i > 0 && j > 1) {
    setI(i - 1)
        setJ(j - 1)
        console.log(i, j);
      } else {
        setI(5)
        setJ(6)
        console.log(false , "Prev");
    }
  }

  
  return (
    <div className='bg-[url(/hero-area.png)] bg-no-repeat bg-cover bg-top pt-[300px] pb-[50px] mt-[-160px]'>
      <div className="w-full h-full flex justify-center">
        <button className='cursor-pointer px-2 py-1 bg-[#eb315a] z-[999]' onClick={showPrev}>Prev</button>
        {/* Prev */}
        {/* {sliderPrev.map((movie)=>(
          <div key={movie.id} className="flex justify-between w-[75%] h-[580px] bg-[#181d2b] p-[30px] shadow-md ">
            <img className='w-[40%] mt-[-100px]' src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className='w-[55%]'>
              <h1 className="text-[45px] mb-[10px]">{movie.title}</h1>
              <div className='mb-[30px]'>
                {getStars(movie.vote_average)} <span className='ml-[20px] text-[17px]'>{movie.vote_count} Votes</span>
              </div>
              <h3 className='text-[25px] mb-[10px]'>Overview:</h3>
              <p className='text-[19px] ml-[5px] mb-[20px]'>{movie.overview}</p>
              <h3 className='text-[25px] mb-[10px]'>Release Date:</h3>
              <p className='text-[19px] ml-[5px]'>{movie.release_date}</p>
            </div>
          </div>
        ))} */}
        {/* Center */}
        {sliderCenter.map((movie)=>(
          <div key={movie.id} className="flex justify-between w-[75%] cursor-pointer h-[580px] bg-[#181d2b] p-[30px] shadow-md">
            <img className='w-[40%] mt-[-100px]' src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className='w-[55%]'>
              <h1 className="text-[45px] mb-[10px] truncate">{movie.title || movie.name}</h1>
              <div className='mb-[30px]'>
                {getStars(movie.vote_average)} <span className='ml-[20px] text-[17px]'>{movie.vote_count} Votes</span>
              </div>
              <h3 className='text-[25px] mb-[10px]'>Overview:</h3>
              <p className='text-[19px] ml-[5px] mb-[20px] '>{movie.overview ? movie.overview : "Overview not avalible"}</p>
              <h3 className='text-[25px] mb-[10px]'>Release Date:</h3>
              <p className='text-[19px] ml-[5px]'>{movie.release_date || movie.first_air_date}</p>
            </div>
          </div>
        ))}
        {/* Next */}
        {/* {sliderNext.map((movie)=>(
          <div key={movie.id} className="flex justify-between w-[75%] h-[580px] bg-[#181d2b] p-[30px] shadow-md translate-x-[50%]">
            <img className='w-[40%] mt-[-100px]' src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className='w-[55%]'>
              <h1 className="text-[45px] mb-[10px]">{movie.title}</h1>
              <div className='mb-[30px]'>
                {getStars(movie.vote_average)} <span className='ml-[20px] text-[17px]'>{movie.vote_count} Votes</span>
              </div>
              <h3 className='text-[25px] mb-[10px]'>Overview:</h3>
              <p className='text-[19px] ml-[5px] mb-[20px]'>{movie.overview}</p>
              <h3 className='text-[25px] mb-[10px]'>Release Date:</h3>
              <p className='text-[19px] ml-[5px]'>{movie.release_date}</p>
            </div>
          </div>
        ))} */}
        <button className='cursor-pointer px-2 py-1 bg-[#eb315a] z-[999]' onClick={showNext}>Next</button>
      </div>
    </div>
  )
}

export default Hero