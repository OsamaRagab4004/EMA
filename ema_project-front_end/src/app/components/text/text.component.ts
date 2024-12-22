import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
@Input() textColor:string;
@Input() header:string;
@Input() text:string;
@Input() marginBottom:string;
@Input() marginTop:string;
@Input() textAlign:string;
  constructor() { }

  ngOnInit() {}

}
