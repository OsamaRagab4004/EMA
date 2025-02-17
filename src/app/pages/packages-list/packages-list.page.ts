import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoginFirebaseService} from "../../services/login-firebase.service";
import {NavigationExtras, Router} from "@angular/router";
import {FireStorageService, Question} from "../../services/fire-storage.service";
import {Observable, zip} from "rxjs";
import {Module} from "../../../shared/Module";
import {map} from "rxjs/operators";
import {element} from "protractor";

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.page.html',
  styleUrls: ['./packages-list.page.scss'],
})
export class PackagesListPage implements OnInit {

  CardsTest: Observable<any[]>;
  moduleObservable: Observable<any[]>;
  userObservable: Observable<any[]>;
  observableQuestion: Observable<Question[]>;

  //TODO Implements all the category into cards. Therfore id could go away id isnt needed anywhere
  constructor(public auth: LoginFirebaseService,
              public db: FireStorageService,
              private router: Router
  ) {
  }

  pushDismiss() {
    console.log("Dismiss");
  }

  pushCancell() {
    console.log("Cancell");
  }

  handleChange(e) {
    switch (e.detail.value) {
      case 'bearbeitet': {
        this.CardsTest = this.moduleObservable.pipe(map(value => {
          return value.filter(x => x.edited);
        }));
        break;
      }
      case 'unbearbeitet': {
        this.CardsTest = this.moduleObservable.pipe(map(value => {
          return value.filter(x => !x.edited);
        }));
        break;
      }
      case  'all': {
        this.CardsTest = this.moduleObservable;
        break;
      }// MORE CASES => PASSED > NOT PASSED
      case 'bestanden': {
        this.CardsTest = this.moduleObservable.pipe(map(value => {
          console.log(value, 'test');
          return value.filter(x => x.score >= 50);
        }));
        break;
      }
      case 'nicht bestanden': {
        this.CardsTest = this.moduleObservable.pipe(map(value => {
          return value.filter(x => x.score < 50);
        }));
        break;
      }
      default: {
        this.CardsTest = this.moduleObservable;
        break;
      }
    }
  }

  ngOnInit() {
  }
  async render(){
   await this.db.renderUsersReference(this.auth.uid);
  }

  ionViewWillEnter() {
    this.render().then(() => {
      const moduleObs = this.db.getAllModule();
      this.userObservable = this.db.getUserModule(this.auth.uid).valueChanges();
      this.moduleObservable = zip(moduleObs, this.userObservable).pipe(map(([category, userRef]) => {
        const arr = [];
        console.log(category, userRef);
        category = category.filter(x => userRef.find(y => y.mdId === x.mdId));
        category.forEach(val => {
          const userData = userRef.find((el) => el.mdId === val.mdId);
          this.observableQuestion = this.db.getAllQuestions(userData.mdId).valueChanges();
          const data = {...val, edited: userData.edited, score: userData.score, questionLength: this.observableQuestion};
          arr.push(data);
        });
        console.log(arr);
        return arr;
      }));
      this.CardsTest = this.moduleObservable;
    });
  }

}
