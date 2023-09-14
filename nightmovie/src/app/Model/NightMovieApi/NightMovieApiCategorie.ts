import {NightMovieApiFilm} from "./NightMovieApiFilm";

export interface NightMovieApiCategorie {
  id: number;
  nom: string;
  description: string;
  film: any[];
}
