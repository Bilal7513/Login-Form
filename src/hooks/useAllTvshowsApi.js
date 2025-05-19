import { useState, useEffect } from 'react'

function useAllTvshowsApi(page) {
  const [tvShows, setTvShows] = useState([])
  
      useEffect(() => {
          const fetchMovies = async () => {
              try {
                  const response = await fetch(
                      `https://api.themoviedb.org/3/discover/tv?api_key=4638fd7e1f9a447f699d14ff279cf2b4&with_watch_providers=8&watch_region=US&with_watch_monetization_types=flatrate&language=en-US&page=${page}`
                  );
                  const data = await response.json();
                  setTvShows(data.results);
                  
              } catch (error) {
                  console.error("Error fetching movies:", error);
              }
          };
          
          fetchMovies();
      }, [page]);
      return {tvShows}
}

export default useAllTvshowsApi