import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExammodePage } from './exammode.page';

const routes: Routes = [
  {
    path: '',
    component: ExammodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExammodePageRoutingModule {}
