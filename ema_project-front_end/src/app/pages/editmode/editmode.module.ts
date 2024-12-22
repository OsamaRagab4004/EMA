import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditmodePageRoutingModule } from './editmode-routing.module';

import { EditmodePage } from './editmode.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { SpaceComponent } from 'src/app/components/space/space.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditmodePageRoutingModule
  ],
  declarations: [EditmodePage,HeaderComponent,TabComponent,CardComponent,SpaceComponent]
})
export class EditmodePageModule {}
