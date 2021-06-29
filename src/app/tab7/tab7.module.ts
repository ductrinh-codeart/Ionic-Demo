import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab7PageRoutingModule } from './tab7-routing.module';
import { Tab7Page } from './tab7.page';

import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: Tab7Page
      }
    ]),
    NgxDatatableModule,
    Tab7PageRoutingModule
  ],
  declarations: [Tab7Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab7PageModule {}
