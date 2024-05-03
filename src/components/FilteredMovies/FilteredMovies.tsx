import { MovieProps } from "../../movie.props";

export default function FilteredMovies(props: { data: MovieProps[] }) {
  const { data } = props;
  console.log("filter movies");
  return (
    <>
      <ul className="list">
        {data?.map((movie) => (
          <li key={movie.imdbID}>
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
