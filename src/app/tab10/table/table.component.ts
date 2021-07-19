import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedModalPage } from '../../tabs/shared-modal/shared-modal.page';
import { SharedToastService } from '../../tabs/shared-toast/shared-toast.service';
import { Tab10ServiceService } from '../tab10-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  modalType;
  modalValue;

  //Toggle Done only
  DoneListView = false;
  TaskListView = true;

  //Task
  TaskId: number = 0;
  TaskName;
  Description;
  CreateOn;
  Estimate;
  CompleteOn;
  StatusId;
  PriorityId;

  //List 
  DoneList:     any = [];
  TaskList:     any = [];
  StatusList:   any = [];
  PriorityList: any = [];

  //filter
  TaskIdFilter:   string = "";
  TaskNameFilter: string = "";
  EstimateFilter: string = "";
  StatusIdFilter: string = "";
  PriorityFilter: string = "";
  DoneListWithoutFilter: any = [];
  TaskListWithoutFilter: any = [];

  constructor(
    private service: Tab10ServiceService,
    public toast: SharedToastService,
    public modalController: ModalController,
  ) { }

  ngOnInit(): void {
    this.loadStatusList();
  }

  loadStatusList() {
    this.service.getAllStatusName().subscribe((data: any) => {
      this.StatusList = data;
    });
    this.loadPrioriyList();
  }

  loadPrioriyList() {
    this.service.getAllPriorityName().subscribe((data: any) => {
      this.PriorityList = data;
    });
    this.refreshTaskList();
  }

  refreshTaskList() {
    this.service.getTaskList().subscribe(data => {

      this.DoneList = [];
      this.TaskList = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].StatusId == 3) {
          this.DoneList.push(data[i]);
          this.DoneListWithoutFilter.push(data[i]);
        }
        else {
          this.TaskList.push(data[i]);
          this.TaskListWithoutFilter.push(data[i]);
        }
      }
    })
  }

  FilterFn() {
    if (this.TaskListView == true) {
      var TaskNameFilter = this.TaskNameFilter;

      this.TaskList = this.TaskListWithoutFilter.filter(function (el) {
        return el.TaskName.toString().toLowerCase().includes(
          TaskNameFilter.toString().trim().toLowerCase()
        );
      });
    }
    else {
      var TaskNameFilter = this.TaskNameFilter;

      this.DoneList = this.DoneListWithoutFilter.filter(function (el) {
        return el.TaskName.toString().toLowerCase().includes(
          TaskNameFilter.toString().trim().toLowerCase()
        );
      });
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {
        // can pass data into modal here!
        modalType: 'add',
        StatusList:   this.StatusList,
        PriorityList: this.PriorityList,

        modalConfig: {
          isAddTask: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue   =   result.data.modalValue;
      this.modalType    =   result.data.modalType;

      this.TaskName     =   result.data.TaskName;
      this.Description  =   result.data.Description;
      this.CreateOn     =   result.data.CreateOn;
      this.Estimate     =   result.data.Estimate;
      this.CompleteOn   =   result.data.CompleteOn;
      this.StatusId     =   result.data.StatusId;
      this.PriorityId   =   result.data.PriorityId;
      if (this.modalValue == 'refuse') {
        this.refuse();
      }
      else {
        this.accept();
      }
    });
    return await modal.present();
  }

  async presentEditModal(obj) {
    debugger

    if (this.TaskListView == true) {
      var item = this.TaskList.find(o => o.TaskId === obj.TaskId);
    }
    else {
      var item = this.DoneList.find(o => o.TaskId === obj.TaskId);
    }

    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {
        // can pass data into modal here!
        TaskId:       item.TaskId,
        TaskName:     item.TaskName,
        Description:  item.Description,
        CreateOn:     item.CreateOn,
        Estimate:     item.Estimate,
        CompleteOn:   item.CompleteOn,
        StatusId:     item.StatusId,
        PriorityId:   item.PriorityId,

        modalType: 'edit',
        StatusList:   this.StatusList,
        PriorityList: this.PriorityList,

        modalConfig: {
          isAddTask: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue   =   result.data.modalValue;
      this.modalType    =   result.data.modalType;

      this.TaskId       =   result.data.TaskId;
      this.TaskName     =   result.data.TaskName;
      this.Description  =   result.data.Description;
      this.CreateOn     =   result.data.CreateOn;
      this.Estimate     =   result.data.Estimate;
      this.CompleteOn   =   result.data.CompleteOn;
      this.StatusId     =   Number(result.data.StatusId);
      this.PriorityId   =   Number(result.data.PriorityId);
      if (this.modalValue == 'refuse') {
        this.refuse();
      }
      else {
        this.accept();
      }
    });
    return await modal.present();
  }

  refuse() {
    if (this.modalType == 'add') {
      this.toast.ToastInfo = {
        header: 'Task Manager:',
        message: 'Cancel Adding New Task!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
    else {
      this.toast.ToastInfo = {
        header: 'Task Manager:',
        message: 'Cancel Editing Existing Task!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
  }

  accept() {

    // seperate this between add new or edit existing.
    if (this.modalType == 'add') {
      var val = {
        TaskId:       this.TaskId,
        TaskName:     this.TaskName,
        Description:  this.Description,
        CreateOn:     this.CreateOn,
        Estimate:     this.Estimate,
        CompleteOn:   this.CompleteOn,
        StatusId:     this.StatusId,
        PriorityId:   this.PriorityId,
      };
      this.service.addTask(val).subscribe(res => {
        this.refreshTaskList();
      });
      this.AddEditComplete();
    }
    else if (this.modalType == 'edit') {
      var val = {
        TaskId:       this.TaskId,
        TaskName:     this.TaskName,
        Description:  this.Description,
        CreateOn:     this.CreateOn,
        Estimate:     this.Estimate,
        CompleteOn:   this.CompleteOn,
        StatusId:     this.StatusId,
        PriorityId:   this.PriorityId,
      };
      this.service.updateTask(val).subscribe(res => {
        this.refreshTaskList();
      });
      this.AddEditComplete();
    }
  }

  AddEditComplete() {
    if (this.modalType == 'add') {
      this.toast.ToastInfo = {
        header: 'Task Manager:',
        message: 'Added Successfully!',
        color: 'success',
      }
      this.toast.presentToast();
    }
    else {
      this.toast.ToastInfo = {
        header: 'Task Manager:',
        message: 'Edited Successfully!',
        color: 'success',
      }
      this.toast.presentToast();
    }
  }

  deleteTask(item) {
    if (confirm('Are you sure?')) {
      this.service.deleteTask(item.TaskId).subscribe(res => {
        this.refreshTaskList();

        this.toast.ToastInfo = {
          header: 'Task Manager:',
          message: 'Deleted Task!',
          color: 'success',
        }
        this.toast.presentToast();

      })
    }
  }

}
