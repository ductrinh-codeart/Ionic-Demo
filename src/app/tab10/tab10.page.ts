import { Component, OnInit, ViewChild } from '@angular/core';
import { PriorityComponent } from './priority/priority.component';
import { StatusComponent } from './status/status.component';
import { TableComponent } from './table/table.component';


@Component({
  selector: 'app-tab10',
  templateUrl: './tab10.page.html',
  styleUrls: ['./tab10.page.scss'],
})
export class Tab10Page implements OnInit {

  @ViewChild(TableComponent) tableview;
  @ViewChild(PriorityComponent) prioview;
  @ViewChild(StatusComponent) statview;

  priority: boolean = false;
  status: boolean = false;
  table: boolean = true;

  constructor(
 ) {
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

  toggleDone() {
    this.refreshDoneList();
  }

  toggleAdd() {
    this.addTask();
  }

  refreshDoneList() {
    if ( this.table == true ) {
    this.tableview.DoneListView = !this.tableview.DoneListView;
    this.tableview.TaskListView = !this.tableview.TaskListView;
    }
    else if ( this.priority == true ) { 
      this.prioview.DoneListView = !this.prioview.DoneListView;
      this.prioview.TaskListView = !this.prioview.TaskListView;
    }
  }

  addTask(){
    if ( this.table == true ) {
        this.tableview.presentModal();
        debugger
      }
      else if ( this.priority == true ) { 
        this.prioview.presentModal();
        debugger
      }
      else if ( this.status == true ) {
        this.statview.presentModal();
        debugger
      }
  }

  ngOnInit() { }

  alert(){
    alert('Open http://localhost/TaskManager for API Server working!')
  }
}
