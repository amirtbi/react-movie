import { useEffect, useState, useRef } from "react";
import Loader from "../components/Loader/Loader";
import StarRating from "../components/StartRating/StartRating";
import { WatchMoviesProps } from "../components/WatchedMovies/watchedmovies.props";
export default function MovieDetail(props: {
  selectedId: string;
  apiKey: string;
  onCloseMovieDetail: () => void;
  onAddWatchedMovie: (movie: WatchMoviesProps) => void;
  watched: WatchMoviesProps[];
}) {
  const { selectedId, onCloseMovieDetail, apiKey, onAddWatchedMovie, watched } =
    props;
  const [movie, setMovie] = useState<{ [key: string]: string }>({});
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  console.log("Rendering");
  const counterRef = useRef(0);
  // const [counterRef, setCounterRef] = useState(0);

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
    if (rating) counterRef.current += 1;
    // if (rating) setCounterRef((prevValue) => prevValue + 1);
  }, [rating]);
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

  useEffect(
    function () {
      const callBack = (e: KeyboardEvent) => {
        if (e.code == "Escape") {
          onCloseMovieDetail();
          console.log("closing");
        }
      };
      document.addEventListener("keydown", callBack);
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [onCloseMovieDetail]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
        console.log(`Clean up rendering the ${title}`);
      };
    },

    [title]
  );
  const isWatched = watched.length
    ? watched.map((watch) => watch.imbdId).includes(selectedId)
    : false;
  const handleAddingToWatchedList = () => {
    setRating(rating);
    const userChoice = {
      imbdId,
      title,
      year,
      poster,
      runtime: Number((runtime.split(" ") as Array<string>).at(0)),
      imdbRating: Number(imdbRating),
      userRating: rating,
      counter: counterRef,
    };
    onAddWatchedMovie(userChoice);
    onCloseMovieDetail();
  };
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
                {!isWatched ? (
                  <>
                    <StarRating
                      key={selectedId}
                      color="yellow"
                      maxRating={10}
                      size={20}
                      onSetMovieRating={setRating}
                    />
                    {rating > 0 && (
                      <button
                        onClick={handleAddingToWatchedList}
                        className="btn-add"
                      >
                        + add to watched list
                      </button>
                    )}
                  </>
                ) : (
                  <p>You rated with this movie</p>
                )}
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
