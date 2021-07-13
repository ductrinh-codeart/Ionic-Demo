import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab9PageRoutingModule } from './tab9-routing.module';

import { Tab9Page } from './tab9.page';
import { DepartmentComponent } from './department/department.component';
import { ShowDepComponent } from './department/show-dep/show-dep.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShowEmpComponent } from './employee/show-emp/show-emp.component';
import { SharedService} from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab9PageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  declarations: 
  [
    Tab9Page,
    DepartmentComponent,
    ShowDepComponent,
    EmployeeComponent,
    ShowEmpComponent,
  ],
  providers: [SharedService]
})
export class Tab9PageModule {}
