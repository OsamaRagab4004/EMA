import { Component, Input, OnInit } from '@angular/core';
import * as internal from 'stream';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  
  @Input() cardText:string;
  @Input() questionsNumber:number;
  @Input() arrowLink:string;
  @Input() private:boolean= false;
  @Input() public:boolean= false;
  @Input() passed:boolean= false;
  @Input() notPassed:boolean= false;
  @Input() cardTitle:string;
  @Input() arrowActivated:boolean= false;
  constructor() { }

  ngOnInit() {}

}
