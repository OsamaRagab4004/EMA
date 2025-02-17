import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpackagePageRoutingModule } from './editpackage-routing.module';

import { EditpackagePage } from './editpackage.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AppLogoComponent } from 'src/app/components/app-logo/app-logo.component';
import { TextComponent } from 'src/app/components/text/text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpackagePageRoutingModule
  ],
  declarations: [EditpackagePage,HeaderComponent,AppLogoComponent,TextComponent]
})
export class EditpackagePageModule {}
