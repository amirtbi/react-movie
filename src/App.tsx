import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Logo from "./components/Logo/Logo";
import Search from "./components/Search/Search";
import FoundResult from "./components/FoundResult/FoundResult";
import ToggleBox from "./components/ToggleBox/ToggleBox";
import FilteredMovies from "./components/FilteredMovies/FilteredMovies";
import WatchedMovies from "./components/WatchedMovies/WatchedMovies";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/Error/Error";
import MovieDetail from "./MovieDetail/MovieDetail";
import { WatchMoviesProps } from "./components/WatchedMovies/watchedmovies.props";

const KEY = "923b616d";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatchedMovies] = useState<WatchMoviesProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorMessage] = useState("");
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const res = await fetch(
          `http://www.omdbapi.com/?S=${query}&apikey=${KEY}`
        );
        const data = await res.json();
        if ("Response" in data && data.Response === "False") {
          throw new Error("movie name is not correct");
        }
        setMovies(data.Search);
      } catch (err: unknown) {
        const resError = (err as { message: string }).message;
        setErrorMessage(resError);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setErrorMessage("");
      return;
    }
    fetchMovieData();
  }, [query]);

  const handleSelectMovie = (id: string) => {
    setSelectedId((selectdId) => (selectdId === id ? null : id));
  };
  const handleWatchedMovie = (movie: WatchMoviesProps) => {
    const movieHasExisted = watched.find(
      (item) => item.imbdId === movie.imbdId
    );
    if (movieHasExisted) {
      return;
    }
    console.log("movie", movie);
    setWatchedMovies((watched) => [...watched, movie]);
  };

  const deleteMovie = (id: string) => {
    setWatchedMovies((watched) =>
      watched.filter((movie) => movie.imbdId !== id)
    );
  };
  const renderToggleBox = () => {
    return (
      <>
        {!movies.length ? (
          <p className="error">Not found any movies</p>
        ) : isLoading && !error ? (
          <Loader />
        ) : !isLoading && !error ? (
          <FilteredMovies data={movies} onSetSelectedId={handleSelectMovie} />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : null}
      </>
    );
  };
  return (
    <>
      <Header>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <FoundResult movies={movies} />
      </Header>
      <Main>
        <ToggleBox>{renderToggleBox()}</ToggleBox>
        <ToggleBox>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovieDetail={() => setSelectedId(null)}
              onAddWatchedMovie={handleWatchedMovie}
              watched={watched}
              apiKey={KEY}
            />
          ) : (
            <>
              <WatchedMovies data={watched} onDeleteMovie={deleteMovie} />
            </>
          )}
        </ToggleBox>
      </Main>
    </>
  );
}
