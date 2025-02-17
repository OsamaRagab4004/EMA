import { Component, OnInit } from '@angular/core';
import {LoginFirebaseService} from '../../services/login-firebase.service';
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  errors:string[] = ['Invalid E-Mail!', 'User not found!', 'Invalid Password!', 'Access to this account has been temporarily disabled. Please try again later!'];
  errorMessage = '';
  constructor(
    public authService: LoginFirebaseService,
    private router: Router,
    private local: LocalStorageService
  ) { }

  ngOnInit() {}
  ionViewWillEnter(){
    if(this.authService.uid){
      //Temporarily so user cant navigate to login page again
      this.router.navigate(['/packages-list']);
    }
  }
  async signIn(email, password){
    //TODO: Integrate an authentication, so not everyone can access the site without logging in
    await this.authService.signIn(email.value, password.value).then((res) => {
      if(res){
        console.log(200);
        this.router.navigate(['/packages-list']);
      }else {
        console.log(res);
      }
    }).catch((err) => {
      switch (err.code){
        case 'auth/invalid-email':
          this.errorMessage = this.errors[0];
          break;
        case 'auth/user-not-found':
          this.errorMessage = this.errors[1];
          break;
        case 'auth/wrong-password':
          this.errorMessage = this.errors[2];
          break;
        case 'auth/too-many-requests':
          this.errorMessage = this.errors[3];
          break;
        default:
          break;
      }
    });
  }

}


