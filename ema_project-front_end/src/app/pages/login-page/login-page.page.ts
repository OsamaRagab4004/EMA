import { Component, OnInit } from '@angular/core';
import {LoginFirebaseService} from '../../services/login-firebase.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  errors:string[] = [];
  constructor(
    public authService: LoginFirebaseService
  ) { }

  ngOnInit() {}
  

}


