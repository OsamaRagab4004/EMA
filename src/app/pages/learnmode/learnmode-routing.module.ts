import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnmodePage } from './learnmode.page';

const routes: Routes = [
  {
    path: '',
    component: LearnmodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnmodePageRoutingModule {}
