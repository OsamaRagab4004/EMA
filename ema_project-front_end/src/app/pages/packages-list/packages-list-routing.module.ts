import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackagesListPage } from './packages-list.page';

const routes: Routes = [
  {
    path: '',
    component: PackagesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesListPageRoutingModule {}
