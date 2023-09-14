import {Component, OnInit} from '@angular/core';
import {ConsoleLogger} from "@angular/compiler-cli";
import {NavController, NavParams} from "@ionic/angular";
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  title = "rposGui";
  constructor(private router: Router) {}

  ngOnInit() {}
}
