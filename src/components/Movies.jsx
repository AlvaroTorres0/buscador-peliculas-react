function MoviesList({ movies }) {
  return (
    <ul>
      {movies?.map((movie) => {
        return (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        );
      })}
    </ul>
  );
}

function NoMoviesFound() {
  return <p>No se encontraron resultados</p>;
}
export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <MoviesList movies={movies} /> : <NoMoviesFound />;
}
