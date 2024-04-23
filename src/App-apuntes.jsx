import { useEffect, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

function App() {
  const { movies } = useMovies();
  const [spanInfoSearchStyles, setSpanInfoSearchStyles] = useState({
    color: "#AAA",
  });

  //* Esta sería la forma no controlada de obtener el valor del input
  //? Al decir no controlada, nos referimos a que no estamos usando el estado de React para obtener el valor del input, sino que estamos obteniendo el valor directamente del DOM
  const handleSubmit = (event) => {
    event.preventDefault();
    //* De esta manera obtenemos el valor del input
    const fields = new window.FormData(event.target);
    const movie = fields.get("inputMovie");
    console.log(movie);

    //* Cuando tenemos más de dos inputs, es mejor usar un objeto
    const { inputMovie } = Object.fromEntries(
      new window.FormData(event.target)
    );
    console.log({ inputMovie });
  };

  //* Esta sería la forma controlada de obtener el valor del input
  //? Al decir controlada, nos referimos a que estamos usando el estado de React para obtener el valor del input
  const [inputMovie, setInputMovie] = useState("");
  const [errorSearch, setErrorSearch] = useState(null);

  //! Algunas ventajas de hacerlo de la manera controlada, es que las validaciones son un poco más sencillas
  const handleChangeInputMovie = (event) => {
    if (event.target.value.startsWith(" ")) {
      return;
    }
    setInputMovie(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputMovie);
  };

  //! Usaremos este useEffect para hacer la validación de la búsqueda
  useEffect(() => {
    if (inputMovie === "") {
      setErrorSearch("Ingresa el nombre de alguna película");
      setSpanInfoSearchStyles({ color: "#AAA" });
      return;
    }

    if (inputMovie.length < 3) {
      setErrorSearch("Debes ingresar al menos 3 caracteres");
      setSpanInfoSearchStyles({ color: "red" });
      return;
    }

    setErrorSearch(null);
  }, [inputMovie]);

  return (
    <div className="principal">
      <header>
        <h1>Buscador de películas</h1>
        <form className="movie-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Avenger, The Matrix, Aquaman..."
            name="inputMovie"
            value={inputMovie}
            onChange={handleChangeInputMovie}
          />
          <button type="submit">Search Movie</button>
        </form>
        <span style={spanInfoSearchStyles}>{errorSearch}</span>
      </header>

      <main>
        <Movies movies={movies}></Movies>
      </main>
    </div>
  );
}

export default App;
