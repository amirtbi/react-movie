import { MovieProps } from "../../movie.props";

export default function FilteredMovies(props: {
  data: MovieProps[];
  onSetSelectedId: (value: string) => void;
}) {
  const { data, onSetSelectedId } = props;
  console.log("filter movies");
  return (
    <>
      <ul className="list list-movies">
        {data?.map((movie) => (
          <li key={movie.imdbID} onClick={() => onSetSelectedId(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
