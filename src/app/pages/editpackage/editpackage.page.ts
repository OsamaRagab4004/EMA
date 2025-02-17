import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Module} from "../../../shared/Module";
import {ActivatedRoute} from "@angular/router";
import {FireStorageService} from "../../services/fire-storage.service";
import {LoginFirebaseService} from "../../services/login-firebase.service";

@Component({
  selector: 'app-editpackage',
  templateUrl: './editpackage.page.html',
  styleUrls: ['./editpackage.page.scss'],
})
export class EditpackagePage implements OnInit {
  module: Observable<Module>;
  editModuleName: string;
  editDescription: string;
  editPublish: string;
  isUser: string;
  constructor(private route: ActivatedRoute, private db: FireStorageService, private auth: LoginFirebaseService) { }

  ngOnInit() {
    this.module = this.db.getModule(this.route.snapshot.params.id).valueChanges();
    this.isUser = this.auth.uid;
  }
  updateModule(name: string, description: string, pub: string){
    console.log(name, description, pub);
    this.db.updatePackage(this.route.snapshot.params.id, name, description, pub === 'true');
  }
  resetModule(){
    this.db.resetModule(this.auth.uid, this.route.snapshot.params.id);
  }
  handleChange(event){
    this.editPublish = event.detail.value;
  }
  deleteModule(){
    this.db.deleteModule(this.route.snapshot.params.id);
  }

}
