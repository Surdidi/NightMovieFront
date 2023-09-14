import { Injectable } from '@angular/core';
import {MovieService} from "../services/movie.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Movie} from "../Model/TMDBMovieResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieResolverService implements Resolve<Movie>{

  constructor(private movieService : MovieService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id  = route.paramMap.get('id');
    return this.movieService.getMovie(id);
  }
}
