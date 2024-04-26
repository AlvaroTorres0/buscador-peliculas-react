import { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, setSearch] = useState("");
  const [errorSearch, setErrorSearch] = useState(null);
  const firstUserSearch = useRef(true);
  const [spanInfoSearchStyles, setSpanInfoSearchStyles] = useState({
    color: "#AAA",
  });

  useEffect(() => {
    const validateInput = () => {
      if (firstUserSearch.current) {
        firstUserSearch.current = search === "";
        return;
      }

      if (search === "") {
        setErrorSearch("No se puede realizar una búsqueda vacía");
        setSpanInfoSearchStyles({ color: "red" });
      } else if (search.length < 3) {
        setErrorSearch("Debes ingresar al menos 3 caracteres");
        setSpanInfoSearchStyles({ color: "red" });
      } else {
        setErrorSearch(null);
      }
    };

    validateInput();
  }, [search]);

  return { search, setSearch, errorSearch, spanInfoSearchStyles };
}

function App() {
  const { search, setSearch, errorSearch, spanInfoSearchStyles } = useSearch();
  const [sort, setSort] = useState(false);
  const { movies, getMovies, loading } = useMovies({
    search,
    sort,
  });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log(search);
      getMovies({ search });
    }, 2000),
    []
  );

  const handleChangeSearch = (event) => {
    if (event.target.value.startsWith(" ")) {
      return;
    }

    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSortMovies = () => {
    setSort(!sort);
  };

  return (
    <div className="principal">
      <header>
        <h1>Prueba técnica</h1>
        <form className="movie-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Avenger, The Matrix, Aquaman..."
            name="search"
            value={search}
            onChange={handleChangeSearch}
          />
          <label htmlFor="sort">Ordenar por nombre</label>
          <input
            type="checkbox"
            onChange={handleSortMovies}
            value={sort}
            name="sort"
            id=""
          />
          <button type="submit">search Movie</button>
        </form>
        <span style={spanInfoSearchStyles}>{errorSearch}</span>
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
