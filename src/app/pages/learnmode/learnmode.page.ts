import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FireStorageService, Question, Answers} from "../../services/fire-storage.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AlertController} from "@ionic/angular";
import {LoginFirebaseService} from "../../services/login-firebase.service";

@Component({
  selector: 'app-learnmode',
  templateUrl: './learnmode.page.html',
  styleUrls: ['./learnmode.page.scss'],
})
export class LearnmodePage implements OnInit {
  questionList: Observable<Question[]>;
  questionName: Observable<Question>;
  answersList: Observable<Answers[]>;
  nextQuestion: Observable<Question>;
  numQuestion: Observable<number>;
  userSelection: any[] = [];
  currentModule: string;
  showResult = true;
  checkBoxes: any[] = [];
  checkResult = false;

  constructor(private local: LocalStorageService, private router: ActivatedRoute, private db: FireStorageService,
              private route: Router, private alertController: AlertController, private auth: LoginFirebaseService) { }
  //TODO get the id of the next question. After that get the answer from that question
  ngOnInit() {
    const params = this.router.snapshot.params;
    if(params.qid === 'null'){
      this.presentAlert(params.id).then(console.log);
    }
    this.questionList = this.local.userObservable;
    this.numQuestion = this.local.userObservable.pipe(map(value => {
      return value.findIndex((res) => res.qId === params.qid);
    }));
    this.questionName = this.local.getUserQuestionById(params.qid);
    this.nextQuestion = this.local.getUserNextQuestion(params.qid);
    this.currentModule = params.id.toString();
    this.local.setAnswersList(this.db.getAnswersFromQuestion(params.id, params.qid).valueChanges());
    this.answersList = this.local.answersObservable;
  }

  async presentAlert(id: string){
    const alert = await this.alertController.create({
      header: 'You should not be here!',
      buttons: [
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.route.navigate(['/package-details/' + id]);
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  getCheckBox(event, test: Answers){
    if(event.target.checked){

      this.userSelection.push(test);
      console.log(this.userSelection);
    }else{
      const index = this.userSelection.findIndex((value) => value.answer === test.answer);
      this.userSelection.splice(index, 1);
      console.log(this.userSelection);
    }
  }
  checkCorrect(){
   return this.userSelection.find((val) => val.correct === false) === undefined;
  }

  submitRes(){
    if(this.showResult){
      this.answersList.subscribe((val) => {
        console.log(val);
        //const indices = val.reduce((r,v,n) => r.concat(v.correct ? n : []), []);
        //console.log(this.checkBoxes);
        let correctLength = 0;
        val.forEach(res => {
          if(res.correct){
            correctLength++;
          }
        });
        this.checkResult = true;
        if(this.userSelection.length === 0  || this.userSelection.length !== correctLength){
          this.local.pushCorrect(false);
        }else {
          let tmp = true;
          for (let value of this.userSelection){
            tmp = tmp && value.correct;
          }
          this.local.pushCorrect(tmp);
          if (tmp){
            this.db.countCorrectAnswerFromQuestion(this.auth.uid, this.router.snapshot.params.id, this.router.snapshot.params.qid);
          }
        }
        console.log(this.local.correctList);
        this.showResult = false;
      }).unsubscribe();
      return;
    }else {
      this.nextQuestion.subscribe((val: Question | null) => {
        if(val === undefined){
          this.route.navigate(['/chart/' + 'learn' + '/' + this.router.snapshot.params.id]);
        }else {
          this.showResult = true;
          this.route.navigate(['/learnmode/' + this.router.snapshot.params.id + '/' + val.qId]);
        }
      }).unsubscribe();
    }
  }

}
