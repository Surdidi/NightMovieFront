import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {LoginPage} from "./login/login.page";
import {AccueilPage} from "./accueil/accueil.page";
import { HttpClientModule } from  '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import {SearchMoviesPage} from "./search-movies/search-movies.page";
import {AddMoviePage} from "./add-movie/add-movie.page";
import {HomePage} from "./home/home.page";
import {SessionsPage} from "./sessions/sessions.page";



@NgModule({
  declarations: [AppComponent, LoginPage, AccueilPage, SearchMoviesPage, AddMoviePage, HomePage, SessionsPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule,IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
