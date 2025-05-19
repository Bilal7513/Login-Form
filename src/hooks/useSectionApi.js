import React, { useState, useEffect } from 'react'
// const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;


function useSectionApi() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/all/week?api_key=4638fd7e1f9a447f699d14ff279cf2b4`
                );
                const data = await response.json();
                setMovies(data.results);
                
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);
    return {movies}
}

export default useSectionApi