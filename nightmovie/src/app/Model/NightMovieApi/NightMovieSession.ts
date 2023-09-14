import {NightMovieApiUser} from "./NightMovieUser";
import {NightMovieApiFilm} from "./NightMovieApiFilm";
import {NightMovieApiCategorie} from "./NightMovieApiCategorie";

export interface NightMovieApiSession {
  id: Number;
  users: NightMovieApiUser[];
  film: NightMovieApiFilm;
  categorie: NightMovieApiCategorie;
  isOngoing: boolean;
}
