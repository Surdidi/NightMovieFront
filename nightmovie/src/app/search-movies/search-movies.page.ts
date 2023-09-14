import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Movie, TMDBMovieResponse} from "../Model/TMDBMovieResponse";
import {NavController} from "@ionic/angular";
import {MovieService} from "../services/movie.service";

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.page.html',
  styleUrls: ['./search-movies.page.scss'],
})
export class SearchMoviesPage {
  movies: any[] = [];
  apiKey: string = '2e7e507d33b685e1e504a18975294495';  // Remplace par ta clé API TMDB
  query: string = "";
  constructor(private http: HttpClient,
              private navCtrl: NavController,
              private movieService: MovieService) { }

  searchMovies() {

    if (this.query && this.query.length > 2) {
      const url = `https://api.themoviedb.org/3/search/movie?language=fr-FR&page=1&query=${this.query}&api_key=${this.apiKey}`;
      this.http.get<TMDBMovieResponse>(url).subscribe(data => {
        this.movies = data['results'];
      });
    }
  }

  navigateToDetails(movie: Movie) {
    this.movieService.setMovie(movie.id,movie);
    this.navCtrl.navigateForward([`/addMovie/${movie.id}`]);
  }


}
