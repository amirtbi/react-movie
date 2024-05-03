import { MovieProps } from "../../movie.props";

export default function FoundResult(props: { movies: MovieProps[] }) {
  const { movies } = props;
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
