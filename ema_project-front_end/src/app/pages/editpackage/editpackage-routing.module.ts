import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpackagePage } from './editpackage.page';

const routes: Routes = [
  {
    path: '',
    component: EditpackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpackagePageRoutingModule {}
