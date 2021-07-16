import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriorityComponent } from './priority/priority.component';
import { StatusComponent } from './status/status.component';

import { Tab10Page } from './tab10.page';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: '',
    component: Tab10Page
  },
  {
    path: 'priority',
    component: PriorityComponent
  },
  {
    path: 'status',
    component: StatusComponent
  },
  {
    path: 'table',
    component: TableComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab10PageRoutingModule {}
