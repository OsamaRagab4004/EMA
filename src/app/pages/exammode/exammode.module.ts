import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExammodePageRoutingModule } from './exammode-routing.module';

import { ExammodePage } from './exammode.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SpaceComponent } from 'src/app/components/space/space.component';
import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExammodePageRoutingModule
  ],
  declarations: [ExammodePage,HeaderComponent,SpaceComponent,CardComponent]
})
export class ExammodePageModule {}
