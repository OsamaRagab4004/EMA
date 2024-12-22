import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.page.html',
  styleUrls: ['./packages-list.page.scss'],
})
export class PackagesListPage implements OnInit {




  pushDismiss() {
    console.log("Dismiss")
  }
  pushCancell() {
    console.log("Cancell")
  }
  handleChange(e) {
    console.log(e.detail.value);
  }


    Cards = [
    {id: 1, name:'Superman',question_num:15,private:true,public:false},
    {id: 2, name:'Batman',question_num:20,private:false,public:true},
    {id: 5, name:'BatGirl',question_num:11,private:true,public:false},
    {id: 3, name:'Robin',question_num:34,private:false,public:true},
    {id: 4, name:'Flash',question_num:55,private:true,public:false}
    
];

  constructor() { }

  ngOnInit() {
  }

}
