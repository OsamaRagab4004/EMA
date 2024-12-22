import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQuestionPageRoutingModule } from './create-question-routing.module';

import { CreateQuestionPage } from './create-question.page';
import { AppLogoComponent } from 'src/app/components/app-logo/app-logo.component';
import { ErrorsMsgComponent } from 'src/app/components/errors-msg/errors-msg.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateQuestionPageRoutingModule
  ],
  declarations: [CreateQuestionPage,AppLogoComponent,ErrorsMsgComponent,HeaderComponent]
})
export class CreateQuestionPageModule {}
