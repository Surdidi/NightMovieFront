import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Movie} from "../Model/TMDBMovieResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NightMovieApiCategorie} from "../Model/NightMovieApi/NightMovieApiCategorie";
import {Storage} from "@ionic/storage-angular";
import {NightMovieApiUser} from "../Model/NightMovieApi/NightMovieUser";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {

  movie!: Movie ;
  selectedCategoryId!: number;
  categories: NightMovieApiCategorie[] = [];
  errorMessage!: string;


  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private storage: Storage,
              public router: Router) {
    storage.create();
  }

  ngOnInit() {
    //let movie = this.route.snapshot.paramMap.get('movie');
    //this.movie = movie;
    if (this.route.snapshot.data['movie']) {
      this.movie = this.route.snapshot.data['movie'];
    }
    this.getCategories();
  }

  async getCategories() {
    let headers = new HttpHeaders();
    var token = await this.storage.get('authToken');
    headers = headers.set("Authorization",`Bearer ${token}`);
    var test = this.http.get<NightMovieApiCategorie[]>('https://localhost:44369/api/Categorie',{headers: headers}).subscribe(data => {
      this.categories = data;
    }, error => {
      console.error('Erreur lors de la récupération des catégories:', error);
    });
    console.log(test);
  }

  async addMovieToDatabase() {
    const movieData = {
      "nom": this.movie.title,
      "tmdbId": this.movie.id,
      "idCategorie": this.selectedCategoryId
    };

    let headers = new HttpHeaders();
    var token = await this.storage.get('authToken');
    headers = headers.set("Authorization",`Bearer ${token}`);

    this.http.post('https://localhost:44369/api/Film', movieData, {headers: headers}).subscribe(response => {
      console.log('Film ajouté!', response);
    }, error => {
      console.log(error);
      this.errorMessage = error.error.message;
    });
    await this.router.navigate(['/home']);
  }

}
