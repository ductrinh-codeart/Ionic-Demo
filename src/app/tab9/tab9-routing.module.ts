import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';

import { Tab9Page } from './tab9.page';

const routes: Routes = [
  {
    path: '',
    component: Tab9Page
  },
  {
    path: 'department',
    component: DepartmentComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab9PageRoutingModule {}
