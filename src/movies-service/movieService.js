const API_KEY = "f3f2a843";
const ENDPOINT = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=`;

export async function searchMovie({ search }) {
  if (search === "") {
    throw new Error("Búsqueda vacía");
  }

  try {
    const response = await fetch(ENDPOINT + search);
    const data = await response.json();
    const mappedMovies = data?.Search.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
    return mappedMovies;
  } catch (error) {
    throw new Error("Error en búsqueda");
  }
}
