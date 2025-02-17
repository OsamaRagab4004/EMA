import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePackagePage } from './create-package.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePackagePageRoutingModule {}
