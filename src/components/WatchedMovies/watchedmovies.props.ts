export interface WatchMoviesProps {
  imbdId: string;
  title: string;
  year: string;
  poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}
export interface WatchRating {
  avgImdbRating: number;
  avgUserRating: number;
  avgRuntime: number;
}
