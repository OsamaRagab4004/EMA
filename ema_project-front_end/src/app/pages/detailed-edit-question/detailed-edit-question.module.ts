import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailedEditQuestionPageRoutingModule } from './detailed-edit-question-routing.module';

import { DetailedEditQuestionPage } from './detailed-edit-question.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AppLogoComponent } from 'src/app/components/app-logo/app-logo.component';
import { TextComponent } from 'src/app/components/text/text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailedEditQuestionPageRoutingModule
  ],
  declarations: [DetailedEditQuestionPage,HeaderComponent,AppLogoComponent,TextComponent]
})
export class DetailedEditQuestionPageModule {}
