import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewAnswerPageRoutingModule } from './add-new-answer-routing.module';

import { AddNewAnswerPage } from './add-new-answer.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TextComponent } from 'src/app/components/text/text.component';
import { AppLogoComponent } from 'src/app/components/app-logo/app-logo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewAnswerPageRoutingModule
  ],
  declarations: [AddNewAnswerPage,HeaderComponent,TextComponent,AppLogoComponent]
})
export class AddNewAnswerPageModule {}
