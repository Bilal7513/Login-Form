import { useState, useEffect } from 'react'

function useAllMoviesApi(page) {
  const [movies, setMovies] = useState([])
  
      useEffect(() => {
          const fetchMovies = async () => {
              try {
                  const response = await fetch(
                      `https://api.themoviedb.org/3/movie/popular?api_key=4638fd7e1f9a447f699d14ff279cf2b4&language=en-US&page=${page}`
                  );
                  const data = await response.json();
                  setMovies(data.results);
                  
              } catch (error) {
                  console.error("Error fetching movies:", error);
              }
          };
          
          fetchMovies();
      }, [page]);
      return {movies}
}

export default useAllMoviesApi