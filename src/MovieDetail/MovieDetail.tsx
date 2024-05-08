import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import StarRating from "../components/StartRating/StartRating";
export default function MovieDetail(props: {
  selectedId: string;
  apiKey: string;
  onCloseMovieDetail: () => void;
}) {
  const { selectedId, onCloseMovieDetail, apiKey } = props;
  const [movie, setMovie] = useState<{ [key: string]: string }>({});
  const [movieUserRating, setMovieUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Director: director,
    Genre: genre,
    imdbID: imbdId,
    Actors: actors,
    imdbRating,
    Released: released,
  } = movie;
  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?i=${selectedId}&apikey=${apiKey}`
      );
      const data = await res.json();
      setIsLoading(false);
      setMovie(data);
    };

    fetchMovieDetail();
  }, [selectedId]);
  return (
    <>
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovieDetail}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${title}`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐ </span>
                  {imdbRating} IMDB rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                <StarRating
                  key={selectedId}
                  color="yellow"
                  maxRating={10}
                  size={20}
                  onSetMovieRating={setMovieUserRating}
                />
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring ({actors})</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    </>
  );
}
