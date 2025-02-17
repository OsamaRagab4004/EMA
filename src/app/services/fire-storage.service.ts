import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database'
import {AngularFirestore, AngularFirestoreCollection, QuerySnapshot} from '@angular/fire/compat/firestore';
import {Module} from '../../shared/Module';
import {Observable} from 'rxjs';
import {LoginFirebaseService} from "./login-firebase.service";
import firebase from "firebase/compat";
import {stringify} from "querystring";

export interface Answers{
  answer: string;
  correct: boolean;
}
export interface Question {
  qId: string;
  fragen: string;
  answers: Answers[];
}

export interface Reference {
  qId: string;
  answeredCorrectly: number;
}


@Injectable({
  providedIn: 'root'
})
export class FireStorageService {
  moduleDataCollection: AngularFirestoreCollection<Module>;
  questionsDataCollection: AngularFirestoreCollection<Question>;
  referenceDataCollection: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore,
  ) {
    this.moduleDataCollection = this.db.collection('category');
    this.referenceDataCollection = this.db.collection('users');
  }


  getAllModule(){
    return this.moduleDataCollection.valueChanges();
  }

  getModule(id: string){
    return this.db.doc<Module>('category/' + id);
  }
  getAllQuestions(id: string){
    return this.db.collection<Question>('category/' + id + '/questions');
  }

  getQuestionsById(id: string, qId: string){
    return this.db.doc<Question>('category/'+ id + '/questions/' + qId);
  }
  getAnswersFromQuestion(id: string, qId: string){
    return this.db.collection<Answers>('category/' + id + '/questions/' + qId + '/answers');
  }
  getAnswerById(id: string, qid: string, aid: string){
    return this.db.doc<Answers>('category/' + id + '/questions/' + qid + '/answers/' + aid);
  }
  async getLength(id: string){
   const test = await this.getAllQuestions(id).ref.get();
   return test.size;
  }
  getUserModule(uId: string){
    return this.referenceDataCollection.doc(uId).collection('module');
  }
  addModule(name: string, pub: boolean, text: string, uid: string){
    const id = this.db.createId();
    const module: Module = {mdId: id, mdName: name, public:pub, description: text, createdBy: uid};
    this.moduleDataCollection.doc(id).set(module);
  }
  addAnswerToQuestion(id: string, qid: string, text: string, isCorrect: boolean){
    const ansId = this.db.createId();
    const answer: Answers = {answer: text, correct: isCorrect};
    this.getAnswersFromQuestion(id, qid).doc(ansId).set(answer);
  }
  addQuestionAndAnswers(question: Question, mdId: string){
    const questId = this.db.createId();
    this.getModule(mdId).collection('questions').doc(questId).set({fragen: question.fragen, qId: questId});
    question.answers.forEach((val) => {
      const ansId = this.db.createId();
      this.getQuestionsById(mdId, questId).collection('answers').doc(ansId).set({...val});
    });
  }

  addUsersReference(uId: string){
    return this.referenceDataCollection.doc(uId).set({createdAt: new Date()});
  }
  resetModule(uId: string, mdId: string){
    const reset = this.referenceDataCollection.doc(uId).collection('module').doc(mdId);
    reset.ref.get().then((data) => {
      const res = data.data();
      res.edited = false;
      res.score = 0;
      data.ref.update({...res});
    });
    reset.collection<Reference>('question').ref.get().then((val) => {
      val.forEach((data) => {
        data.ref.get().then((res) => {
          const tmp = res.data();
          tmp.answeredCorrectly = 0;
          res.ref.update({...tmp});
        });
      });
    });
  }
  async renderUsersReference(uId: string) {
    await this.getAllModule().subscribe((val) => {
      val.forEach((res) => {
        this.referenceDataCollection.doc(uId).collection('module').doc(res.mdId).ref.get().then((data) => {
          if(!data.exists && (res.createdBy === uId || res.public)){
            data.ref.set({mdId: res.mdId, edited: false, score: 0});
          }
        });
      });
    });
    await this.checkIfPackageExists(uId);
  }
  countCorrectAnswerFromQuestion(uId: string, mdId: string, qId: string){
    this.referenceDataCollection.doc(uId).collection('module').doc(mdId).collection('question').doc(qId).ref.get().then((data) => {
      if(!data.exists){
        data.ref.set({qId: qId, answeredCorrectly: 1});
      }else{
        const res = data.data() as Reference;
        res.answeredCorrectly++;
        data.ref.update({...res});
      }
    });
  }
  checkIfPackageExists(uId: string){
    this.getUserModule(uId).valueChanges().subscribe((value) => {
      value.forEach(val => {
        this.getModule(val.mdId).ref.get().then((data) => {
          if (!data.exists || (uId !== data.data().createdBy && !data.data().public)){
            this.deleteUserModule(uId, val.mdId);
          }
        });
      });
    });
  }
  deleteUserModule(uId: string, mdId: string){
    this.referenceDataCollection.doc(uId).collection('module').doc(mdId).collection('question').ref.get().then((val) => {
      val.forEach((data) => this.deleteUserQuestion(uId, mdId, data.id));
    });
    this.referenceDataCollection.doc(uId).collection('module').doc(mdId).delete();
  }
  deleteUserQuestion(uId:string , mdId:string, qId:string){
    this.referenceDataCollection.doc(uId).collection('module').doc(mdId).collection('question').doc(qId).delete().then(() => {
      this.resetModule(uId, mdId);
      console.log('Deleted and Resetted');
    }).catch(console.log);

  }
  updatePackageReference(uId: string, mdId: string, testScore: any, mode: string){
    this.referenceDataCollection.doc(uId).collection('module').doc(mdId).ref.get().then(data => {
      const res = data.data();
      res.edited = true;
      res.score = mode === 'learn' ? res.score : testScore;
      data.ref.update({...res});
    });
  }
  get5CorrectQuestion(uId: string, mdId: string){
    return this.referenceDataCollection.doc(uId).collection('module').doc(mdId).collection<Reference>('question', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('answeredCorrectly' ,'>=', 5);
      return query;
    }).valueChanges();
  }

  updateQuestion(id: string, qId: string, newQuestion: string){
   const question = this.getQuestionsById(id, qId);
   console.log(newQuestion);
   question.update({fragen: newQuestion});
  }
  updateAnswers(id: string, qid: string, aid: string, newAnswer: string, newCorrect: boolean){
    const answers = this.getAnswerById(id, qid, aid);
    answers.update({answer: newAnswer, correct: newCorrect});
  }

  deleteAnswers(id: string, qid: string, aid: string){
    const answers = this.getAnswerById(id, qid,aid);
    answers.delete().then(() => {
      console.log('deleted 200');
    }).catch(console.log);
  }
  async deleteQuestion(id: string, qid: string){
    //Delete the Answers from it first
    const answer = await this.getAnswersFromQuestion(id, qid).ref.get();
    answer.forEach((val) => {
      val.ref.delete();
    });
    const question = this.getQuestionsById(id , qid);
    question.delete().then(() => {
      console.log('deleted 200');
    }).catch(console.log);
  }
  async deleteModule(id: string){
    //Same process but we need all question first
    const questions = await this.getAllQuestions(id).ref.get();
    questions.forEach((data) => {
      this.deleteQuestion(id, data.id);
    });
    const module = this.getModule(id);
    module.delete().then(() => {
      console.log('deleted 200');
    }).catch(console.log);
  }
  updatePackage(id: string, newName: string, newDescription: string, newPublic: boolean){
    const module = this.getModule(id);
    if (newPublic === undefined){
      // We know its the same
      module.update({mdName: newName, description: newDescription});
    }else {
      module.update({mdName: newName, description: newDescription, public: newPublic});
    }
  }


}
