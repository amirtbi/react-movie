import { WatchMoviesProps } from "./watchedmovies.props";
import WatchedMovieItem from "./WatchedMovieItem";
export default function WatchedMoviesLits(props: { data: WatchMoviesProps[] }) {
  const { data } = props;
  return (
    <>
      <ul className="list">
        {data.map((movie) => (
          <WatchedMovieItem key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </>
  );
}
