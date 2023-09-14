import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public _email : string  = "";
  public _password = "" ;
  public async login(){
    console.log("Email:"+this._email);
    var test = this.http.post("https://localhost:44369/api/Authentification/Login",{
      "username": this._email,
      "password": this._password
    }, { responseType: 'text' }).subscribe(x => this.auth(x) );
  }

  public async auth(token: string){
    await this.storage.set('authToken', token);
    await this.router.navigate(['/home']);

  }
  constructor(public navCtrl: NavController,
              public router: Router,
              private http: HttpClient,
              private storage: Storage) {
    this.storage.create();
  }

  ngOnInit(): void {
  }

}
