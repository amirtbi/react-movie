import { useState } from "react";
import WatchListSummary from "./WatchListSummary";
import WatchedMoviesLits from "./WatchedMoviesList";
import { WatchMoviesProps } from "./watchedmovies.props";
export default function WatchedMovies(props: {
  data: WatchMoviesProps[];
  onDeleteMovie: (id: string) => void;
}) {
  const { data, onDeleteMovie } = props;
  return (
    <>
      <WatchListSummary watched={data} />
      <WatchedMoviesLits data={data} onDeleteMovie={onDeleteMovie} />
    </>
  );
}
