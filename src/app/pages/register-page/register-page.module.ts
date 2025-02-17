import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPagePageRoutingModule } from './register-page-routing.module';
import {ErrorsMsgComponent} from '../../components/errors-msg/errors-msg.component';
import { RegisterPagePage } from './register-page.page';
import { AppLogoComponent } from 'src/app/components/app-logo/app-logo.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegisterPagePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [RegisterPagePage,AppLogoComponent,HeaderComponent, ErrorsMsgComponent]
})
export class RegisterPagePageModule {}
