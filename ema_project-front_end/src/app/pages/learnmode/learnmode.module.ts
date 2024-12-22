import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearnmodePageRoutingModule } from './learnmode-routing.module';

import { LearnmodePage } from './learnmode.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { TextComponent } from 'src/app/components/text/text.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { SpaceComponent } from 'src/app/components/space/space.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearnmodePageRoutingModule
  ],
  declarations: [LearnmodePage,HeaderComponent,CardComponent,TextComponent,TabComponent,SpaceComponent]
})
export class LearnmodePageModule {}
