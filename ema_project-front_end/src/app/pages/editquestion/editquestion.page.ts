import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.page.html',
  styleUrls: ['./editquestion.page.scss'],
})
export class EditquestionPage implements OnInit {
  
  handlerMessage = '';
  roleMessage = '';
  Answers = [

    {
      id :1,
      text : "Lorem Ipsum answer 1",
      val : true
    } ,
    {
      id :2,
      text : "Lorem Ipsum answer 2",
      val : false
    },
    {
      id :3,
      text : "Lorem Ipsum answer 3",
      val : true
    },
    {
      id :4,
      text : "Lorem Ipsum answer 4",
      val : false
    }
  ]

  constructor(private alertController: AlertController) {}

  ngOnInit() {}


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Delete this Question forever ?',
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
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;

}

}