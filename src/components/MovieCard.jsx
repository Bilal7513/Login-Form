import React from 'react'

function MovieCard({onClick, movie, className}) {
    
    const getStars = (vote) => {
        if (vote < 2) return "⭐";
        if (vote < 4) return "⭐⭐";
        if (vote < 6) return "⭐⭐⭐";
        if (vote < 8) return "⭐⭐⭐⭐";
        if (vote >= 8) return "⭐⭐⭐⭐⭐";
    };

    return (
        <>
            <div onClick={onClick} className={`text-white cursor-pointer`}>
                <img 
                    className={`w-full rounded-lg mb-2 ${className}`}
                    src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    alt={movie.title} 
                />
                <h1 className='font-semibold text-[30px] truncate w-[90%]'>{movie.title || movie.name}</h1>
                <div>
                    {getStars(movie.vote_average)} 
                    <span className='pl-[20px] text-[17px]'>{movie.vote_count} Votes</span>
                </div>
            </div>
        </>
    )
}

export default MovieCard