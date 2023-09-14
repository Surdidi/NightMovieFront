import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginPage} from "./login/login.page";
import {AccueilPage} from "./accueil/accueil.page";
import {SearchMoviesPage} from "./search-movies/search-movies.page";
import {AddMoviePage} from "./add-movie/add-movie.page";
import {MovieResolverService} from "./resolver/movie-resolver.service";
import {HomePage} from "./home/home.page";
import {SessionsPage} from "./sessions/sessions.page";

const routes: Routes = [
  { path: "", redirectTo:"login", pathMatch: "full" },
  { path: "login", component: LoginPage },
  { path: "accueil", component: AccueilPage },
  { path: "searchMovie", component: SearchMoviesPage },
  { path: "addMovie", component: AddMoviePage },
  {
    path: 'addMovie/:id',
    resolve: {
      movie: MovieResolverService
    },
    component: AddMoviePage
  },
  {path: 'home',component: HomePage},
  { path: 'sessions', component:SessionsPage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
