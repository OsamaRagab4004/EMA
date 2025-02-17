import {Injectable} from '@angular/core';
import {Answers, Question, Reference} from "./fire-storage.service";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  question: Observable<Question>;
  answers: Answers[] = [];
  answer: Observable<Answers>;
  _observableList: BehaviorSubject<Question[]> = new BehaviorSubject([]);
  userObservableList: BehaviorSubject<Question[]> = new BehaviorSubject([]);
  questionList: Question[] = [];
  answerListObservable: BehaviorSubject<Answers[]> = new BehaviorSubject([]);
  correctList: any[] = [];
  toFilter: any[] = [];
  userUid = '';

  constructor() {
  }

  // eslint-disable-next-line no-underscore-dangle
  get observableList(): Observable<Question[]> {
    return this._observableList.asObservable();
  }

  get answersObservable(): Observable<Answers[]> {
    return this.answerListObservable.asObservable();
  }

  get userObservable(): Observable<Question[]>{
    return this.userObservableList.asObservable();
  }

  setQuestionsList(list: Observable<Question[]>) {
    this.questionList = [];
    list.subscribe((val) => {
      val.forEach((data) => {
        this.questionList.push(data);
        console.log(data);
      });
      this.questionList = this.questionList.sort(() => Math.random() - 0.5);
      this._observableList.next(this.questionList);
    });
  }

  setUserQuestion(list: Observable<Question[]>, toFilter: any[]) {
    console.log(toFilter);
    this.questionList = [];
    list.subscribe((val) => {
      val.forEach((data) => {
        this.questionList.push(data);
      });
      this.questionList = this.questionList.filter(x => !toFilter.includes(x.qId));
      console.log('After subscribe',this.questionList);
      this.questionList = this.questionList.sort(() => Math.random() - 0.5);
      this.userObservableList.next(this.questionList);
    });

  }

  pushCorrect(answer) {
    this.correctList.push(answer);
  }

  getCorrectList() {
    return this.correctList;
  }

  clearCorrectList() {
    this.correctList = [];
  }

  setAnswersList(list: Observable<Answers[]>) {
    this.answers = [];
    list.subscribe((res) => {
      res.forEach((data) => this.answers.push(data));
      this.answers = this.answers.sort(() => Math.random() - 0.5);
      this.answerListObservable.next(this.answers);
    });
  }

  getAnswersList(): Answers[] {
    return this.answers;
  }

  setAnswersLocal(list: Answers[]) {
    this.answers = list;
    this.answerListObservable.next(this.answers);
  }

  getListQuestion(): Question[] {
    return this.questionList;
  }

  getQuestionById(qId: string): Observable<Question> {
    return this.observableList.pipe(map((val: Question[] | null) => val.find(x => x.qId === qId)));
  }

  getUserQuestionById(qId: string): Observable<Question> {
    return this.userObservable.pipe(map((val: Question[] | null) => val.find(x => x.qId === qId)));
  }

  getNextQuestion(qId: string) {
    return this.observableList.pipe(map((val) => {
      let index = val.findIndex((res) => res.qId === qId);
      console.log(val, index);
      return val[++index];
    }));
  }

  getUserNextQuestion(qId: string) {
    return this.userObservable.pipe(map((val) => {
      let index = val.findIndex((res) => res.qId === qId);
      console.log(val, index);
      return val[++index];
    }));
  }
}
