import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartPageRoutingModule } from './chart-routing.module';

import { ChartPage } from './chart.page';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { SpaceComponent } from 'src/app/components/space/space.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [ChartPage,HeaderComponent, TabComponent, SpaceComponent]
})
export class ChartPageModule {}
