import { Component, Input, OnInit } from '@angular/core';

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

  
  constructor() { }

  ngOnInit() {}

}
