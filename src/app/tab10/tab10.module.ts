import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab10PageRoutingModule } from './tab10-routing.module';

import { Tab10Page } from './tab10.page';
import { PriorityComponent } from './priority/priority.component';
import { StatusComponent } from './status/status.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab10Page }]),
    Tab10PageRoutingModule
  ],
  declarations: [
    Tab10Page,
    PriorityComponent,
    StatusComponent,
    TableComponent
  ]
})
export class Tab10PageModule {}
