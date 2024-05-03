export interface WatchMoviesProps {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}
export interface WatchRating {
  avgImdbRating: number;
  avgUserRating: number;
  avgRuntime: number;
}
