import React from 'react'
import movieGenreApi from '../hooks/useMovieGenreApi';
import tvGenreApi from '../hooks/useTvGenreApi';

function MovieDetails({ movie, onClose }) {
    if (!movie) return null

    const movGenre = movieGenreApi();
    const allMovieGenres = movGenre.movies;
    const movGenres = movie.genre_ids
    const movGenreMap = allMovieGenres.reduce((id, genre) => {
        id[genre.id] = genre.name;
        return id;
    }, {});
    const movGenresNames = movGenres.flat().map(id => movGenreMap[id]);


    const tvGenre = tvGenreApi();
    const allTvGenres = tvGenre.movies;
    const tvGenres = movie.genre_ids;
    const tvGenreMap = allTvGenres.reduce((id, genre) => {
        id[genre.id] = genre.name;
        return id;
    }, {});
    const tvGenresNames = tvGenres.flat().map(id => tvGenreMap[id]);

    const getStars = (vote) => {
        if (vote < 2) return "⭐";
        if (vote < 4) return "⭐⭐";
        if (vote < 6) return "⭐⭐⭐";
        if (vote < 8) return "⭐⭐⭐⭐";
        if (vote >= 8) return "⭐⭐⭐⭐⭐";
    };

    return (
        <>
            <div key={movie.id} className={`relative  mx-[50px] rounded-[10px] flex text-white bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})` }}>
                <div className='bg-[#1e2535] absolute w-full h-full rounded-[10px] opacity-60'></div>
                <div className='w-full z-0 p-[100px]'>
                    <div className='opacity-100 flex'>
                        <img className='w-[25%] opacity-100 rounded-[10px] mr-[50px]' src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title || movie.name} />
                        <div className='w-[65%] mt-[10px]'>
                            <h1 className='font-semibold opacity-100 text-[30px]'>{movie.title || movie.name}</h1>
                            <div className='flex text-[18px]'>
                                <p className='mr-[3px]'>{movie.release_date || movie.first_air_date}</p>
                                <p>({movie.original_language.toUpperCase()})</p>
                                <p className='ml-[15px]'>{movie.title ? movGenresNames.join(', ') : tvGenresNames.join(', ')}</p>
                            </div>
                            {getStars(movie.vote_average)} <span className='pl-[20px] text-[18px]'>{movie.vote_count} Votes</span>
                            <h3 className='text-[20px] mt-[25px]'>Overview:</h3>
                            <p className='text-[18px]'>{movie.overview}</p>
                            <button 
                                className="absolute cursor-pointer top-[-10px] right-[-10px] bg-red-500 text-lg px-[10px] py-[3px] rounded-full" 
                                onClick={onClose}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetails