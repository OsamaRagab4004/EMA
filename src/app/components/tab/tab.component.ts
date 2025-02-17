import { Component, Input, OnInit } from '@angular/core';
import {LoginFirebaseService} from '../../services/login-firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {

  @Input() home:string;
  @Input() add:string;
  @Input() logout:string ="/logout";
  @Input() settings:string;


  constructor(
    public auth: LoginFirebaseService,
    private router: Router
  ) { }

  ngOnInit() {}

  signOut(){
    this.auth.signOut();
  }
}
