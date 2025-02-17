import { Component, OnInit } from '@angular/core';
import {FireStorageService} from "../../services/fire-storage.service";
import {LoginFirebaseService} from "../../services/login-firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.page.html',
  styleUrls: ['./create-package.page.scss'],
})
export class CreatePackagePage implements OnInit {
  publishCheckBox = false;
  title: string;
  description = '';
  error = '';
  constructor(private db: FireStorageService, private auth: LoginFirebaseService, private router : Router) { }

  ngOnInit() {
  }
  addPackage(title, pub, description){
    if(!/^[\w*? !-/\n]+$/.test(title) || title.trim() === ''){
      this.error = 'Bitte geben Sie einen Titel an!';
    }else {
      this.db.addModule(title.trim(), pub, description, this.auth.uid);
      this.router.navigate(['/packages-list']);
    }
  }

}
