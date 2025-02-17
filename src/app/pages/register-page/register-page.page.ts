import { Component, OnInit } from '@angular/core';
import {LoginFirebaseService} from '../../services/login-firebase.service';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FireStorageService} from "../../services/fire-storage.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {
  credentials: FormGroup;
  errors: string[] = ['Invalid Email', 'Weak Password! Password should be at least 6 Characters long!', 'Email is already in use!'];
  error = '';
  constructor(
    private formBuild: FormBuilder,
    public authService: LoginFirebaseService,
    private router: Router,
    private db: FireStorageService
  ) { }

  get email(){
    return this.credentials.get('email');
  }
  get password(){
    return this.credentials.get('password');
  }
  ngOnInit() {
    this.credentials = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ionViewWillEnter(){
  }
  signUp(email, password){
    this.authService.signUp(this.email.value, this.password.value).then((res) => {
      if(res){
        this.db.addUsersReference(res.user.uid).then(() => {
          this.router.navigate(['/login-page']);
        });
      }
    }).catch((err) => {
      switch (err.code){
        case 'auth/invalid-email':
          this.error = this.errors[0];
          break;
        case 'auth/weak-password':
          this.error = this.errors[1];
          break;
        case 'auth/email-already-in-use':
          this.error = this.errors[2];
          break;
        default:
          break;
      }
    });
  }

}
