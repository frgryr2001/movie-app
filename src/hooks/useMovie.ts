import {useEffect, useState} from 'react';
import {movieAPI} from '../api/movieAPI';
import {IMovieResponse, Movie} from '../interfaces/movieInterface';

interface MovieState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovie = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MovieState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    const nowPlayingPromise = await movieAPI.get<IMovieResponse>(
      '/now_playing',
    );
    const popularPromise = await movieAPI.get<IMovieResponse>('/popular');
    const topRatedPromise = await movieAPI.get<IMovieResponse>('/top_rated');
    const upcomingPromise = await movieAPI.get<IMovieResponse>('/upcoming');
    const response = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      nowPlaying: response[0].data.results,
      popular: response[1].data.results,
      topRated: response[2].data.results,
      upcoming: response[3].data.results,
    });

    setIsLoading(false);
  };
  useEffect(() => {
    getMovies().catch(err => console.log(err));
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
