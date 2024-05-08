import { WatchMoviesProps } from "./watchedmovies.props";
export default function WatchedMovieItem(props: {
  movie: WatchMoviesProps;
  onDeleteMovie: (id: string) => void;
}) {
  const { movie, onDeleteMovie } = props;
  return (
    <>
      <li key={movie.imbdId}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
          <button
            className="btn-delete"
            onClick={() => onDeleteMovie(movie.imbdId)}
          >
            X
          </button>
        </div>
      </li>
    </>
  );
}
