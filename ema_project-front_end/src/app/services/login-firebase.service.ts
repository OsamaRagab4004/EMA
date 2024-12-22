import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginFirebaseService {

  constructor(
    public fireAuth: AngularFireAuth,
  ) {//TODO
  }

  signUp(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
}
