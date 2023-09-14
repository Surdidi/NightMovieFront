import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie, TMDBMovieResponse} from "../Model/TMDBMovieResponse";
import {NightMovieApiFilm} from "../Model/NightMovieApi/NightMovieApiFilm";
import {Storage} from "@ionic/storage-angular";
import {NightMovieApiCategorie} from "../Model/NightMovieApi/NightMovieApiCategorie";

// ... autres imports

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  movies : Movie[] = [];
  tmdbUrl = "https://api.themoviedb.org/3/movie/";
  apiKey = "2e7e507d33b685e1e504a18975294495"; // Remplacez par votre clé API TMDB
  categories: NightMovieApiCategorie[] = [];
  selectedCategoryIds: number[] = [];



  constructor(private http: HttpClient,
              private storage: Storage) {
    storage.create();
  }

  async onCategoryChange(category: NightMovieApiCategorie, event: any) {
    console.log(event);
    var isSelected = event.detail.checked
    if (isSelected && !this.selectedCategoryIds.includes(category.id)) {
      this.selectedCategoryIds.push(category.id);
    } else if (!isSelected) {
      const index = this.selectedCategoryIds.indexOf(category.id);
      if (index > -1) {
        this.selectedCategoryIds.splice(index, 1);
      }
    }
    console.log(this.selectedCategoryIds);

    let headers = new HttpHeaders();
    var token = await this.storage.get('authToken');
    headers = headers.set("Authorization",`Bearer ${token}`);
    this.movies = [];
    this.http.post<NightMovieApiFilm[]>('https://localhost:44369/api/Categorie/Films',this.selectedCategoryIds,{headers: headers}).subscribe(data => {
      data.forEach(movie => {
        this.http.get<Movie>(this.tmdbUrl + movie.tmdbId + "?language=fr-FR&api_key=" + this.apiKey).subscribe(tmdbData => {
          this.movies.push(tmdbData);
        });
      });
    });
  }

  ngOnInit() {
    this.loadMovies();
    this.loadCategories();
  }

  async loadCategories() {
    let headers = new HttpHeaders();
    var token = await this.storage.get('authToken');
    headers = headers.set("Authorization",`Bearer ${token}`);
    var test = this.http.get<NightMovieApiCategorie[]>('https://localhost:44369/api/Categorie',{headers: headers}).subscribe(data => {
      this.categories = data;
    }, error => {
      console.error('Erreur lors de la récupération des catégories:', error);
    });
  }

  async loadMovies() {
    let headers = new HttpHeaders();
    var token = await this.storage.get('authToken');
    headers = headers.set("Authorization",`Bearer ${token}`);
    this.http.get<NightMovieApiFilm[]>('https://localhost:44369/api/Film',{headers: headers}).subscribe(data => {
      data.forEach(movie => {
        this.http.get<Movie>(this.tmdbUrl + movie.tmdbId + "?language=fr-FR&api_key=" + this.apiKey).subscribe(tmdbData => {
          this.movies.push(tmdbData);
        });
      });
    });
  }
}
