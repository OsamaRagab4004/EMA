import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {getAuth, setPersistence, browserSessionPersistence, browserLocalPersistence} from "@angular/fire/auth";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoginFirebaseService implements CanActivate {
  isloggedin: boolean;
  uid: string;

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
    private local: LocalStorageService
  ) {//TODO
  }

  signUp(email: string, password: string) {
    //lets secure this! TODO
    //check if password has a length of > 6
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  rememberSession(email: string, password: string){
    return;
  }
  signOut() {
    return this.fireAuth.signOut().then(() => {
      this.uid = undefined;
    });
  }

  sendReset(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  async onAuth() {
    await this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.isloggedin = true;
        this.uid = user.uid;

        //this.router.navigate(['/packages-list']);
      } else {
        this.uid = undefined;
        this.isloggedin = false;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.fireAuth.onAuthStateChanged((user) => {
        if (user) {
          this.isloggedin = true;
          this.uid = user.uid;
          if(route.url[0].path === 'home' || route.url[0].path === 'login-page' || route.url[0].path === 'register-page' || route.url[0].path === 'forget-password'){
            this.router.navigate(['/packages-list']);
          }
          resolve(true);
          //this.router.navigate(['/packages-list']);
        } else {
          this.uid = undefined;
          this.isloggedin = false;
          if(route.url[0].path !== 'home' && route.url[0].path !== 'login-page' && route.url[0].path !== 'register-page' && route.url[0].path !== 'forget-password'){
            this.router.navigate(['home']);
            resolve(false);
          }else {
            resolve(true);
          }
        }
      });
    });
  }
}

//TODO this is the firebase auth-service. Some functions are still missing.
