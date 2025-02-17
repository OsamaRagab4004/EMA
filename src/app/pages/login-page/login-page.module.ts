import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPagePageRoutingModule } from './login-page-routing.module';

import { LoginPagePage } from './login-page.page';
import { AppLogoComponent } from 'src/app/components/app-logo/app-logo.component';
import { ErrorsMsgComponent } from 'src/app/components/errors-msg/errors-msg.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPagePageRoutingModule
  ],
  declarations: [LoginPagePage,AppLogoComponent,ErrorsMsgComponent,HeaderComponent]
})
export class LoginPagePageModule {}
