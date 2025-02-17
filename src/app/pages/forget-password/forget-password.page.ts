import { Component, OnInit } from '@angular/core';
import {LoginFirebaseService} from "../../services/login-firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  errors: string[] = ['Invalid Email', 'User not found!', 'Email is missing'];
  errorMessage = '';
  constructor(private auth: LoginFirebaseService, private route: Router) { }
  ngOnInit() {
  }
  sendReset(email){
    this.auth.sendReset(email.value).then(() => {
      this.route.navigate(['home']);
      window.alert('Wir haben dir einen Link auf deinem Email zugesendet bitte bestätige es!');
    }).catch((err) => {
      switch (err.code){
        case 'auth/invalid-email':
          this.errorMessage = this.errors[0];
          break;
        case 'auth/user-not-found':
          this.errorMessage = this.errors[1];
          break;
        case 'auth/missing-email':
          this.errorMessage = this.errors[2];
          break;
        default:
          break;
      }
    });
  }

}
