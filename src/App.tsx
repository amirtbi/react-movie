import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Logo from "./components/Logo/Logo";
import Search from "./components/Search/Search";
import FoundResult from "./components/FoundResult/FoundResult";
import ToggleBox from "./components/ToggleBox/ToggleBox";
import FilteredMovies from "./components/FilteredMovies/FilteredMovies";
import WatchedMovies from "./components/WatchedMovies/WatchedMovies";
import StarRating from "./components/StartRating/StartRating";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/Error/Error";

const KEY = "923b616d";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <>
      <StarRating
        onSetMovieRating={setMovieRating}
        defaultRating={3}
        maxRating={4}
        color="yellow"
        size={12}
        messages={["Terrible", "Bad", "Okay", "Good"]}
      />
      <p>You scored the movie {movieRating} value</p>
    </>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorMessage] = useState("");
  const query = "inter1ception";

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
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
    fetchMovieData();
  }, []);
  const renderToggleBox = () => {
    return (
      <>
        {isLoading && !error ? (
          <Loader />
        ) : !isLoading && !error ? (
          <FilteredMovies data={movies} />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : null}
      </>
    );
  };
  return (
    <>
      <Test />
      <Header>
        <Logo />
        <Search />
        <FoundResult movies={movies} />
      </Header>
      <Main>
        <ToggleBox>{renderToggleBox()}</ToggleBox>
        <ToggleBox>
          <WatchedMovies data={watched} />
        </ToggleBox>
      </Main>
    </>
  );
}
