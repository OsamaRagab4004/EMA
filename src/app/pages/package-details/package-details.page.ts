import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Module} from '../../../shared/Module';
import {FireStorageService, Question} from '../../services/fire-storage.service';
import {LocalStorageService} from "../../services/local-storage.service";
import {map} from "rxjs/operators";
import {AlertController} from "@ionic/angular";
import {LoginFirebaseService} from "../../services/login-firebase.service";


@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.page.html',
  styleUrls: ['./package-details.page.scss'],
})
export class PackageDetailsPage implements OnInit, OnDestroy {
  module: Observable<Module>;
  questions: Observable<Question[]>;
  question: Observable<Question>;
  questionList: Question[] = [];
  id: string;
  learnQuestions: Observable<Question[]>;
  learnQuestion: Observable<Question>;
  toFilter: any[] = [];
  subscription: Subscription;
  constructor(private route: ActivatedRoute,
              public db: FireStorageService,
              private local: LocalStorageService, private alertController: AlertController, private router: Router,
              public auth: LoginFirebaseService,) {
  }

  ngOnInit() {
    this.toFilter = [];
    this.id = this.route.snapshot.params.id;
    this.toFilter = [];
    this.module = this.db.getModule(this.id).valueChanges();
    this.questions = this.db.getAllQuestions(this.id).valueChanges();
    this.local.setQuestionsList(this.questions);
    this.subscription = this.db.get5CorrectQuestion(this.auth.uid, this.id).subscribe((val) =>{
      val.forEach(x => this.toFilter.push(x.qId));
      this.local.setUserQuestion(this.questions, this.toFilter);
    });
    this.question = this.local.observableList.pipe(map((val) => val[0]));
    this.learnQuestion = this.local.userObservable.pipe(map(val => val[0]));
  }
  ionViewWillEnter(){
    this.local.clearCorrectList();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'No questions for this package! Please create a question!',
      buttons: [
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/create-question/' + this.id]);
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
  gotoLearnmode(){
    this.learnQuestion.subscribe((val: Question| null) => {
      if(val === undefined){
        this.presentAlert();
      }else{
        this.router.navigate(['/learnmode/' + this.id + '/' + val.qId]);
      }
    }).unsubscribe();
  }

  gotoExammode(){
    this.question.subscribe((val: Question| null) => {
      if(val === undefined){
        this.presentAlert();
      }else{
        this.router.navigate(['/exammode/' + this.id + '/' + val.qId]);
      }
    }).unsubscribe();
  }

}
