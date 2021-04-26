import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FloatingActionButtonPageRoutingModule } from './floating-action-button-routing.module';

import { FloatingActionButtonPage } from './floating-action-button.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FloatingActionButtonPageRoutingModule
  ],
  declarations: [FloatingActionButtonPage]
})
export class FloatingActionButtonPageModule {}
