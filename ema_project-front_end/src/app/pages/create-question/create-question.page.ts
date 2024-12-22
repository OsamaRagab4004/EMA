import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.page.html',
  styleUrls: ['./create-question.page.scss'],
})
export class CreateQuestionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }




Answers = [
  {id: 1, answerVal:'Answer 1',value:true},
  {id: 2, answerVal:'Answer 2',value:false},
  {id: 3, answerVal:'Answer 3',value:true},
];


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
