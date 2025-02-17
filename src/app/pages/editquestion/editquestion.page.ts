import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Answers, FireStorageService, Question} from "../../services/fire-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {LoginFirebaseService} from "../../services/login-firebase.service";
@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.page.html',
  styleUrls: ['./editquestion.page.scss'],
})
export class EditquestionPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';
  Answers: Observable<Answers[]>;
  question: Observable<Question>;
  mdId: string;
  qId: string;
  answersId: string;
  constructor(private alertController: AlertController, private db: FireStorageService, private route: ActivatedRoute, private router: Router, private auth: LoginFirebaseService) {}

  ngOnInit() {
    this.mdId = this.route.snapshot.params.id;
    this.qId = this.route.snapshot.params.qid;
    // eslint-disable-next-line max-len
    this.Answers = this.db.getAnswersFromQuestion(this.route.snapshot.params.id, this.route.snapshot.params.qid).valueChanges({idField: 'aId'});
    this.question = this.db.getQuestionsById(this.route.snapshot.params.id, this.route.snapshot.params.qid).valueChanges();

  }


  async presentAlert(mode: string, id: string) {
    const alert = await this.alertController.create({
      header: 'Delete this ' + mode + ' forever ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: () => {
            if (mode === 'Question'){
              this.handlerMessage = 'Alert confirmed ' + mode;
              this.db.deleteQuestion(this.mdId, this.qId).then(() => {
                this.db.deleteUserQuestion(this.auth.uid, this.mdId, this.qId);
                this.router.navigate(['/packages-list']);
              });
            }else{
              this.handlerMessage = 'Alert confirmed ' + mode;
              this.db.deleteAnswers(this.mdId,this.qId,id);
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;

}

}
