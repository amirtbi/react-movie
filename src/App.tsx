import { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Logo from "./components/Logo/Logo";
import Search from "./components/Search/Search";
import FoundResult from "./components/FoundResult/FoundResult";
import ToggleBox from "./components/ToggleBox/ToggleBox";
import FilteredMovies from "./components/FilteredMovies/FilteredMovies";
import WatchedMovies from "./components/WatchedMovies/WatchedMovies";
import StarRating from "./components/StartRating/StartRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

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
  const [movies, setTempMovies] = useState(tempMovieData);
  const [watched, setTempWatchedMovies] = useState(tempWatchedData);
  return (
    <>
      <Test />
      <Header>
        <Logo />
        <Search />
        <FoundResult movies={movies} />
      </Header>
      <Main>
        <ToggleBox>
          <FilteredMovies data={movies} />
        </ToggleBox>
        <ToggleBox>
          <WatchedMovies data={watched} />
        </ToggleBox>
      </Main>
    </>
  );
}
