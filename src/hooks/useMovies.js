import { useMemo, useRef, useState, useCallback } from "react";
import { searchMovie } from "../movies-service/movieService";

export function useMovies({ search, sort }) {
  const [movies, setResponseMovies] = useState([]);
  const [loading, setLoading] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      previousSearch.current = search;
      const moviesResponse = await searchMovie({ search });
      setResponseMovies(moviesResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovies, getMovies, loading, previousSearch };
}
