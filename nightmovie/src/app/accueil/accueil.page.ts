import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router"
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private storage: Storage) {
  }

  async ngOnInit() {
    var token = await this.storage.get('authToken');
    this.http.get("http://88.172.131.125:17001/api/v1/search?query=Mulan&page=1&language=en").subscribe(x => console.log(x) );
  }

}
