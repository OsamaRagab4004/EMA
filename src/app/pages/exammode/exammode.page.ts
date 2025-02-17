import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Answers, FireStorageService, Question} from "../../services/fire-storage.service";
import {AlertController} from "@ionic/angular";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-exammode',
  templateUrl: './exammode.page.html',
  styleUrls: ['./exammode.page.scss'],
})
export class ExammodePage implements OnInit {
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
              private route: Router, private alertController: AlertController) {
  }

  ngOnInit() {
    const params = this.router.snapshot.params;
    if (params.qid === 'null') {
      this.presentAlert(params.id).then(console.log);
    }
    this.questionList = this.local.observableList;
    this.numQuestion = this.questionList.pipe(map(val => {
      return val.findIndex((res) => res.qId === params.qid);
    }));
    this.questionName = this.local.getQuestionById(params.qid);
    this.nextQuestion = this.local.getNextQuestion(params.qid);
    this.currentModule = params.id.toString();
    this.local.setAnswersList(this.db.getAnswersFromQuestion(params.id, params.qid).valueChanges());
    this.answersList = this.local.answersObservable;
  }

  async presentAlert(id: string) {
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

  getCheckBox(event, test: Answers) {
    if (event.target.checked) {
      this.userSelection.push(test);
      console.log(this.userSelection);
    } else {
      const index = this.userSelection.findIndex((value) => value.answer === test.answer);
      this.userSelection.splice(index, 1);
      console.log(this.userSelection);
    }
  }

  submitRes() {
    this.answersList.subscribe(val => {
      let correctLength = 0;
      val.forEach(res => {
        if(res.correct){
          correctLength++;
        }
      });
      if (this.userSelection.length === 0 || this.userSelection.length !== correctLength) {
        this.local.pushCorrect(false);
      } else {
        let tmp = true;
        for (let value of this.userSelection) {
          tmp = tmp && value.correct;
        }
        this.local.pushCorrect(tmp);
      }
    }).unsubscribe();
    this.nextQuestion.subscribe((val: Question | null) => {
      if (val === undefined) {
        this.route.navigate(['/chart/' + 'exam/' + this.router.snapshot.params.id]);
      } else {
        this.showResult = true;
        this.route.navigate(['/exammode/' + this.router.snapshot.params.id + '/' + val.qId]);
      }
    }).unsubscribe();

  }

}
