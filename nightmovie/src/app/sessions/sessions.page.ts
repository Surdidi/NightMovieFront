import {Component, OnInit, ViewChild} from '@angular/core';
import {NightMovieApiSession} from "../Model/NightMovieApi/NightMovieSession";
import {NightMovieApiUser} from "../Model/NightMovieApi/NightMovieUser";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage-angular";
import {IonModal} from "@ionic/angular";
import jwt_decode from "jwt-decode";
import {NightMovieApiToken} from "../Model/NightMovieApi/NightMovieToken";



@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {

  sessions: NightMovieApiSession[] = []; // Ici, vous pouvez récupérer les séances précédentes depuis votre API ou base de données.
  isAdmin: boolean = true;
  users: NightMovieApiUser[] = [];
  usersSelected: NightMovieApiUser[] = [];
  @ViewChild(IonModal) modal?: IonModal

  constructor(private http: HttpClient,
                    private storage: Storage
  ) {
    this.storage.create();
    this.CheckAdmin();
  }

  async generateNewSession() {
    let headers = new HttpHeaders();
    var token = await this.storage.get('authToken');
    headers = headers.set("Authorization",`Bearer ${token}`);
    this.http.post<NightMovieApiUser[]>('https://localhost:44369/api/Seance/Generate',this.usersSelected,{headers: headers}).subscribe(data => {
      this.users = data;
    });
    this.getSeances();
    this.modal?.dismiss();
  }

  onUserChange(user: NightMovieApiUser, event:any){
    var isSelected = event.detail.checked
    if (isSelected && !this.usersSelected.includes(user)) {
      this.usersSelected.push(user);
    } else if (!isSelected) {
      const index = this.usersSelected.indexOf(user);
      if (index > -1) {
        this.usersSelected.splice(index, 1);
      }
    }
  }

  async ngOnInit() {
    await this.getUsers();
    await this.getSeances();
  }

  async CheckAdmin(){
    await this.storage.get('authToken').then(token => {
      if (token) {
        const decodedToken = jwt_decode<NightMovieApiToken>(token);
        console.log(decodedToken);
        this.isAdmin = decodedToken.isAdmin === "TRUE";
      }
    });
    console.log("Admin : "+this.isAdmin);
  }

  async getUsers(){
    let headers = new HttpHeaders();
    var token = await this.storage.get('authToken');
    headers = headers.set("Authorization",`Bearer ${token}`);
    this.http.get<NightMovieApiUser[]>('https://localhost:44369/api/Account/GetAll',{headers: headers}).subscribe(data => {
      this.users = data;
    });
  }

  async getSeances(){
    let headers = new HttpHeaders();
    var token = await this.storage.get('authToken');
    headers = headers.set("Authorization",`Bearer ${token}`);
    this.http.get<NightMovieApiSession[]>('https://localhost:44369/api/seance/list',{headers: headers}).subscribe(data => {
      this.sessions = data;
    });
  }

  async deleteSession(sessionId: any) {
    let headers = new HttpHeaders();
    var token = await this.storage.get('authToken');
    headers = headers.set("Authorization",`Bearer ${token}`);
    this.http.delete(`https://localhost:44369/api/Seance/DeleteSeance?idSeance=${sessionId}`,{headers: headers}).subscribe();
    await this.getSeances();
  }

  revealMovie(){
  }

}
