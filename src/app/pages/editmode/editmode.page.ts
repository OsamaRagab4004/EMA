import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FireStorageService, Question} from "../../services/fire-storage.service";
import {LoginFirebaseService} from "../../services/login-firebase.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-editmode',
  templateUrl: './editmode.page.html',
  styleUrls: ['./editmode.page.scss'],
})
export class EditmodePage implements OnInit {

   questions: Observable<Question[]>;
   mdId: string;

  // eslint-disable-next-line max-len
  constructor(private auth: LoginFirebaseService, private db: FireStorageService, private local: LocalStorageService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.auth.onAuth();
    this.mdId = this.route.snapshot.params.id;
    this.questions = this.db.getAllQuestions(this.route.snapshot.params.id).valueChanges();
  }

}
