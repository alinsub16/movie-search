import React, {useEffect, useState } from 'react'
import hero from '../assets/hero-img.png';
import bgimg from '../assets/background-img.png';
import Search from '../components/Search';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { useDebounce } from 'react-use';
import { useSearchParams } from 'react-router-dom';

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
method: 'GET',
headers: {
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`
}

}


const Hero = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [searchTerm, setSearchTerm] = useState(
    initialQuery && initialQuery !== 'undefined' ? initialQuery : ''
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTeam] = useState('')
  const [latestPosters, setLatestPosters] = useState([]);
  
  

    useDebounce(() => setDebouncedSearchTeam(searchTerm), 500, [searchTerm]);

     useEffect(() => {
    setSearchParams(searchTerm ? { query: searchTerm } : {});
  }, [searchTerm, setSearchParams]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try{
    const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
    const response = await fetch (endpoint, API_OPTIONS); 

    if(!response.ok){
      throw new Error('failed to fetch Movies')
    }
    const data = await response.json();

    if(data.Response === 'false') {
      setErrorMessage (data.Error || 'Failed to fetch Movies')
      setMovieList([]);
      return;
    }
    

     // Fetch trailer for each movie
      const moviesWithVideos = await Promise.all(
        (data.results || []).map(async (movie) => {
          try {
            const videoRes = await fetch(`${API_BASE_URL}/movie/${movie.id}/videos`, API_OPTIONS);
            const videoData = await videoRes.json();
            const trailer = videoData.results.find(
              (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
            );

            return {
              ...movie,
              videoKey: trailer ? trailer.key : null
            };
          } catch (err) {
            console.error(`Failed to fetch trailer for ${movie.title}`, err);
            return {
              ...movie,
              videoKey: null
            };
          }
        })
      );
      
    
    setMovieList(moviesWithVideos);

    } catch (error) {
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMessage('Error fetching Movies, please try again later');
    }finally{
      setIsLoading(false);
    }
  }

// To fetch the 3 latest poster on hero section
useEffect(() => {
  const fetchLatestPosters = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/movie/now_playing?language=en-US&page=1`, API_OPTIONS);
      const data = await res.json();
      const topThree = data.results.slice(0, 3);
      setLatestPosters(topThree);
    } catch (error) {
      console.error('Failed to fetch latest posters:', error);
    }
  };

  fetchLatestPosters();
}, []);

useEffect(() => {
  setIsLoading(true);
  fetchMovies(debouncedSearchTerm);
},[debouncedSearchTerm]);

  return (
    <main>
        <div className="pattern bg-cover bg-center w-full" style={{ backgroundImage: `url(${bgimg})` }}></div>
                <div className="text-center z-[9] relative pt-[100px] px-4" >
                    <div className="flex justify-center gap-2 flex-wrap mt-[120px] mb-[80px] ">
                        {latestPosters.map((movie, index) => {
                          const rotation = index === 0 ? '-rotate-[12deg] z-[-1]' : index === 2 ? 'rotate-[12deg] z-[-1]' : '';
                          return (
                            <div
                              key={movie.id}
                              className={`w-[180px] h-[270px] rounded-lg shadow-lg max-[800px]:w-[180px] max-[800px]:h-[220px] max-[500px]:w-[100px] max-[500px]:h-[140px] overflow-hidden transform ${rotation}`}
                            >
                              <img
                                src={
                                  movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : hero
                                }
                                alt={movie.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          );
                        })}
                      </div>
                    <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>
                </div>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <div className='wrapper w-full max-w-[1400px] block mx-auto'>  
            <section className="all-movies">
              <h2 className='center'>All Movies</h2>
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <Spinner />
                </div>
              ) : errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
              ) : (
                <ul className='place-items-center'>
                  {movieList.length === 0 ? (
                    <p className="text-center text-white text-lg py-10">No movies found.</p>
                  ) : (
                  movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} searchTerm={searchTerm} />
                  ))
                )}
                </ul>
              )}
            </section>
          </div>
    </main>   
  ) 
}

export default Hero