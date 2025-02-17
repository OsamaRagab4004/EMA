import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Answers, FireStorageService} from "../../services/fire-storage.service";
import {Observable} from "rxjs";
import {LoginFirebaseService} from "../../services/login-firebase.service";

@Component({
  selector: 'app-editanswer',
  templateUrl: './editanswer.page.html',
  styleUrls: ['./editanswer.page.scss'],
})
export class EditanswerPage implements OnInit {

  answerAsObservable: Observable<Answers>;
  newAnswer: string;
  newCorrect: string;
  mdId: string;
  qId: string;
  aId: string;
  constructor(private route: ActivatedRoute, private db: FireStorageService, private auth: LoginFirebaseService) { }

  ngOnInit() {
    this.mdId = this.route.snapshot.params.id;
    this.qId = this.route.snapshot.params.qid;
    this.aId = this.route.snapshot.params.aid;
    this.answerAsObservable = this.db.getAnswerById(this.route.snapshot.params.id, this.route.snapshot.params.qid, this.route.snapshot.params.aid).valueChanges();
  }
  updateAnswer(newAnswer: string, newCorrect: string){
    this.db.updateAnswers(this.mdId, this.qId, this.aId, newAnswer, newCorrect === 'true');
    this.db.resetModule(this.auth.uid, this.mdId);
  }

}
