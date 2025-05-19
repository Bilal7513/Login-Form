import { useState, useEffect } from 'react'

function useTvGenreApi() {
    const [movies, setMovies] = useState([])
  
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/tv/list?api_key=4638fd7e1f9a447f699d14ff279cf2b4&language=en-US
`
                );
                const data = await response.json();
                setMovies(data.genres);
                
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        
        fetchMovies();
    }, []);
    return {movies}
}

export default useTvGenreApi