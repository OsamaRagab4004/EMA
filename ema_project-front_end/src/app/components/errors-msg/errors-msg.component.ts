import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'errors-msg',
  templateUrl: './errors-msg.component.html',
  styleUrls: ['./errors-msg.component.scss'],
})
export class ErrorsMsgComponent implements OnInit {

@Input() error:string;
@Input() errors:string[];
  constructor() { }

  ngOnInit() {}

}
