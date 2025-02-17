import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditquestionPageRoutingModule } from './editquestion-routing.module';

import { EditquestionPage } from './editquestion.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { SpaceComponent } from 'src/app/components/space/space.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditquestionPageRoutingModule
  ],
  declarations: [EditquestionPage,HeaderComponent,TabComponent,SpaceComponent]
})
export class EditquestionPageModule {}
