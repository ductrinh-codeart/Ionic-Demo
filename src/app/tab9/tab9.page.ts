import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab9',
  templateUrl: './tab9.page.html',
  styleUrls: ['./tab9.page.scss'],
})
export class Tab9Page implements OnInit {

  employee: boolean = false;
  department: boolean = true;

  constructor() {
    this.alert();
   }

  ShowDepartment() {
    this.department = true;
    this.employee = false;
  }

  ShowEmployee() {
    this.department = false;
    this.employee = true;
  }

  ngOnInit() { }

  alert(){
    alert('Open http://localhost/WebAPIDemo for API Server working!')
  }
}
