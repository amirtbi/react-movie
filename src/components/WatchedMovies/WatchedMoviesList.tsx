import { WatchMoviesProps } from "./watchedmovies.props";
import WatchedMovieItem from "./WatchedMovieItem";
export default function WatchedMoviesLits(props: {
  data: WatchMoviesProps[];
  onDeleteMovie: (id: string) => void;
}) {
  const { data, onDeleteMovie } = props;
  return (
    <>
      <ul className="list">
        {data.map((movie) => (
          <WatchedMovieItem
            onDeleteMovie={onDeleteMovie}
            key={movie.imbdId}
            movie={movie}
          />
        ))}
      </ul>
    </>
  );
}
