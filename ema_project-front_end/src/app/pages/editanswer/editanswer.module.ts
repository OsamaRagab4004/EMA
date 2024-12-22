import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditanswerPageRoutingModule } from './editanswer-routing.module';

import { EditanswerPage } from './editanswer.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AppLogoComponent } from 'src/app/components/app-logo/app-logo.component';
import { TextComponent } from 'src/app/components/text/text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditanswerPageRoutingModule
  ],
  declarations: [EditanswerPage,HeaderComponent,AppLogoComponent,TextComponent]
})
export class EditanswerPageModule {}
