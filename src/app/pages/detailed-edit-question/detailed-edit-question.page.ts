import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FireStorageService, Question} from "../../services/fire-storage.service";
import {Observable} from "rxjs";
import {LoginFirebaseService} from "../../services/login-firebase.service";

@Component({
  selector: 'app-detailed-edit-question',
  templateUrl: './detailed-edit-question.page.html',
  styleUrls: ['./detailed-edit-question.page.scss'],
})
export class DetailedEditQuestionPage implements OnInit {
  question: Observable<Question>;
  editQuestion: string;
  constructor(private route: ActivatedRoute, private db: FireStorageService, private auth: LoginFirebaseService) { }

  ngOnInit() {
    this.question = this.db.getQuestionsById(this.route.snapshot.params.id, this.route.snapshot.params.qid).valueChanges();
  }
  updateQuestion(newQuestion: string){
    this.db.updateQuestion(this.route.snapshot.params.id, this.route.snapshot.params.qid, newQuestion);
    this.db.resetModule(this.auth.uid, this.route.snapshot.params.id);
  }

}
