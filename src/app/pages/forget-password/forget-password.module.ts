import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetPasswordPageRoutingModule } from './forget-password-routing.module';
import { ErrorsMsgComponent } from 'src/app/components/errors-msg/errors-msg.component';
import { ForgetPasswordPage } from './forget-password.page';
import { AppLogoComponent } from 'src/app/components/app-logo/app-logo.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetPasswordPageRoutingModule
  ],
  declarations: [ForgetPasswordPage,AppLogoComponent,HeaderComponent, ErrorsMsgComponent]
})
export class ForgetPasswordPageModule {}
