import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackageDetailsPageRoutingModule } from './package-details-routing.module';

import { PackageDetailsPage } from './package-details.page';
import { CardComponent } from 'src/app/components/card/card.component';
import { SpaceComponent } from 'src/app/components/space/space.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { ErrorsMsgComponent } from 'src/app/components/errors-msg/errors-msg.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PackageDetailsPageRoutingModule,
  ],
  declarations: [PackageDetailsPage, CardComponent,SpaceComponent,TabComponent,ErrorsMsgComponent,HeaderComponent]
})
export class PackageDetailsPageModule {}
