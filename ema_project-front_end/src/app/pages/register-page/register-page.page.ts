import { Component, OnInit } from '@angular/core';
import {LoginFirebaseService} from '../../services/login-firebase.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {

  constructor(
    public authService: LoginFirebaseService
  ) { }

  ngOnInit() {}
  signUp(email, password){
    this.authService.signUp(email.value, password.value).then((res) => {
      console.log(200);
    }).catch(console.log);
  }

}
