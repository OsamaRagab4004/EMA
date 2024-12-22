import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackagesListPageRoutingModule } from './packages-list-routing.module';

import { PackagesListPage } from './packages-list.page';
import { CardComponent } from 'src/app/components/card/card.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { SpaceComponent } from 'src/app/components/space/space.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PackagesListPageRoutingModule
  ],
  declarations: [PackagesListPage,CardComponent,TabComponent,SpaceComponent,HeaderComponent]
})
export class PackagesListPageModule {}
