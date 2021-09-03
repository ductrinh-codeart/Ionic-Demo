import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Tab12PageRoutingModule } from './tab12-routing.module';

import { Tab12Page } from './tab12.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Tab12PageRoutingModule,
    HttpClientModule,
  ],
  declarations: [Tab12Page]
})
export class Tab12PageModule {}
