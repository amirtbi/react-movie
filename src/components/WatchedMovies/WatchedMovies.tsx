import { useState } from "react";
import WatchListSummary from "./WatchListSummary";
import WatchedMoviesLits from "./WatchedMoviesList";
import { WatchMoviesProps } from "./watchedmovies.props";
export default function WatchedMovies(props: { data: WatchMoviesProps[] }) {
  const { data } = props;
  return (
    <>
      <WatchListSummary watched={data} />
      <WatchedMoviesLits data={data} />
    </>
  );
}
