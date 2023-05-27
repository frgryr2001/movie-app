import {useCallback, useEffect, useState} from 'react';
import {movieAPI} from '../api/movieAPI';
import {MovieFull} from '../interfaces/movieInterface';
import {Cast} from '../interfaces/creditsInterface';
interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMovieDetail = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = useCallback(async () => {
    const movieDetailsPromise = await movieAPI.get<MovieFull>(`/${movieId}`);
    const castPromise = await movieAPI.get(`/${movieId}/credits`);

    const [movieDetailsResponse, castResponse] = await Promise.all([
      movieDetailsPromise,
      castPromise,
    ]);

    setState({
      isLoading: false,
      movieFull: movieDetailsResponse.data,
      cast: castResponse.data.cast,
    });
  }, [movieId]);

  useEffect(() => {
    getMovieDetails().catch(err => console.log(err));
  }, [getMovieDetails]);

  return {
    ...state,
  };
};
