import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditanswerPage } from './editanswer.page';

const routes: Routes = [
  {
    path: '',
    component: EditanswerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditanswerPageRoutingModule {}
