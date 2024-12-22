import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewAnswerPage } from './add-new-answer.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewAnswerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewAnswerPageRoutingModule {}
