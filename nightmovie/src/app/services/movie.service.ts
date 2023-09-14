import { Injectable } from '@angular/core';
import {Movie} from "../Model/TMDBMovieResponse";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  getMovie(id : any): Movie {
    return this._movies[parseInt(id)];
  }

  setMovie(id : number, value: Movie) {
    this._movies[id] = value;
  }

  private _movies : Movie[] = [];
  constructor() { }
}
