import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModalPageRoutingModule } from './shared-modal-routing.module';

import { SharedModalPage } from './shared-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModalPageRoutingModule
  ],
  declarations: [SharedModalPage]
})
export class SharedModalPageModule {}
