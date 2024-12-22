import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePackagePageRoutingModule } from './create-package-routing.module';

import { CreatePackagePage } from './create-package.page';
import { AppLogoComponent } from 'src/app/components/app-logo/app-logo.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePackagePageRoutingModule
  ],
  declarations: [CreatePackagePage,AppLogoComponent,HeaderComponent]
})
export class CreatePackagePageModule {}
