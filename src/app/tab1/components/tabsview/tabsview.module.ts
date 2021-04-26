import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsviewPageRoutingModule } from './tabsview-routing.module';

import { TabsviewPage } from './tabsview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsviewPageRoutingModule
  ],
  declarations: [TabsviewPage]
})
export class TabsviewPageModule {}
