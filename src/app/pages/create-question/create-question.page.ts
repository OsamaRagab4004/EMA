import {AfterContentInit, Component, NgZone, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {IonModal, ModalController,} from "@ionic/angular";
import {Answers, FireStorageService, Question} from "../../services/fire-storage.service";
import {BehaviorSubject, Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.page.html',
  styleUrls: ['./create-question.page.scss'],
})
export class CreateQuestionPage implements OnInit {
  @ViewChild('out', {read: ViewContainerRef}) outRef: ViewContainerRef;
  @ViewChild('content', {read: TemplateRef}) contentRef: TemplateRef<any>;
  errors: string[] = ['Erstelle bitte eine Antwort bevor du fortfährst!', 'Fülle Bitte einen Text in der Frage aus', 'Fülle Bitte einen Text in den Antworten aus'];
  error = '';
  answerItem: string;
  answerCorrect: boolean;
  answersList: Answers[] = [];
  answerAsObservable: Observable<Answers[]>;
  questionName: string;

  constructor(private modal: ModalController, private local: LocalStorageService, private db: FireStorageService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(id: number) {
    this.modal.dismiss({answer: this.answersList[id].answer, correct: this.answersList[id].correct}, 'confirm');
  }

  onWillDismiss(event: Event, id) {
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      this.answersList[id].answer = ev.detail.data.answer;
      this.answersList[id].correct = ev.detail.data.correct === 'true';
      this.rerender();
    }
  }
  addAnswer(answerText: string, correctVal: string) {
    if(!/^[\w*? !-/\n]+$/.test(answerText) || answerText.trim() === ''){
      this.error = this.errors[2];
    }else {
      this.answersList.push({answer: answerText.trim(), correct: correctVal === 'true'});
      this.rerender();
    }
  }
  rerender(){
    console.log(this.answersList);
    this.local.setAnswersLocal(this.answersList);
    this.answerAsObservable = this.local.answersObservable;
  }
  deleteAnswer(index: number){
    this.answersList.splice(index, 1);
    this.rerender();
  }

  addQuestionAndAnswers(questionName: string){
    if(this.answersList.length === 0){
      this.error = this.errors[0];
    }else if (!/^[\w*? !-/\n]+$/.test(questionName) || questionName.trim() === '') {
      this.error = this.errors[1];
    }else{
      const question: Question = {qId: '0', answers: this.answersList, fragen: questionName.trim()};
      this.db.addQuestionAndAnswers(question, this.route.snapshot.params.id);
      this.router.navigate(['package-details/' + this.route.snapshot.params.id]);
    }
  }



}

/**
 * {
 * question : text
 * answers {
 * {id, answer1, true or false}
 * {id, answer2, true or false}
 * {id, answer3, true or false}
 *
 * }
 *
 * }
 *
 *
 */
