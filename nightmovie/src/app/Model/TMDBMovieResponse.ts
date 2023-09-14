export interface TMDBMovieResponse {
  results: Movie[];
}

export interface Movie {
  id: number;
  title: string;
  release_date: string; // au format YYYY-MM-DD
  poster_path: string; // c'est souvent un chemin partiel
  overview: string;
}
