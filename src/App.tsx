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
import { useMovie } from "./components/hooks/useMovie";
import { useLocalStorageState } from "./components/hooks/useLocalStorageState";

const KEY = "923b616d";
export default function App() {
  const [watched, setWatchedMovies] = useLocalStorageState([], "watched");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { movies, isLoading, error } = useMovie(query, handleCloseMovie);

  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleSelectMovie(id: string) {
    setSelectedId((selectdId) => (selectdId === id ? null : id));
  }
  function handleWatchedMovie(movie: WatchMoviesProps) {
    const movieHasExisted = watched.find(
      (item) => item.imbdId === movie.imbdId
    );
    if (movieHasExisted) {
      return;
    }
    setWatchedMovies((watched) => [...watched, movie]);
  }

  function deleteMovie(id: string) {
    setWatchedMovies((watched) =>
      watched.filter((movie) => movie.imbdId !== id)
    );
  }
  function renderToggleBox() {
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
  }
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
