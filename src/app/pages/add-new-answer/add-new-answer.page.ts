import { Component, OnInit } from '@angular/core';
import {FireStorageService} from "../../services/fire-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-new-answer',
  templateUrl: './add-new-answer.page.html',
  styleUrls: ['./add-new-answer.page.scss'],
})
export class AddNewAnswerPage implements OnInit {
  newAnswer: string;
  isCorrect: string;
  constructor(private db: FireStorageService, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  addAnswer(ans: string, cor: string){
    this.db.addAnswerToQuestion(this.route.snapshot.params.id, this.route.snapshot.params.qid, ans, cor === 'true');
  }

}
