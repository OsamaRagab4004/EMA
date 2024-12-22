import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailedEditQuestionPage } from './detailed-edit-question.page';

const routes: Routes = [
  {
    path: '',
    component: DetailedEditQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailedEditQuestionPageRoutingModule {}
