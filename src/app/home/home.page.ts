import {Component, OnInit} from '@angular/core';
import {FireStorageService} from '../services/fire-storage.service';
import {AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Module} from '../../shared/Module';
import {NavigationExtras, Router} from "@angular/router";
import {LoginFirebaseService} from "../services/login-firebase.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  moduleDataCollection: AngularFirestoreCollection<Module>;
  allModules = [];
  loggedIn = false;
  constructor(
    public dataService: FireStorageService,
    public route: Router,
    public auth: LoginFirebaseService,
  ) {
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    if(this.auth.uid){
      //Temporarily so user cant navigate to login page again
      this.route.navigate(['/packages-list']);
    }
  }

}
