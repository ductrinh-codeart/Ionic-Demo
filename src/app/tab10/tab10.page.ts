import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab10',
  templateUrl: './tab10.page.html',
  styleUrls: ['./tab10.page.scss'],
})
export class Tab10Page implements OnInit {

  priority: boolean = false;
  status: boolean = false;
  table: boolean = true;

  constructor() {
    this.alert();
  }

  ShowTable() {
    this.table = true;
    this.priority = false;
    this.status = false;
  }

  ShowPriority() {
    this.table = false;
    this.priority = true;
    this.status = false;
  }

  ShowStatus() {
    this.table = false;
    this.priority = false;
    this.status = true;
  }

  ngOnInit() { }

  alert(){
    alert('Open http://localhost/TaskManager for API Server working!')
  }
}
