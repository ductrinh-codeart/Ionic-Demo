import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SharedLoadingService } from '../../tabs/shared-loading/shared-loading.service';
import { SharedModalPage } from '../../tabs/shared-modal/shared-modal.page';
import { SharedToastService } from '../../tabs/shared-toast/shared-toast.service';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {

  link;
  modalType;
  modalValue;
  EmployeeId: number = 0;
  EmployeeName;
  Department;
  DateOfJoining;
  PhotoFileName;
  PhotoFilePath;

  //filter
  EmployeeIdFilter: string = "";
  EmployeeNameFilter: string = "";
  DepartmentNameFilter: string = "";
  EmployeeListWithoutFilter: any = [];

  constructor(
    private service: SharedService,
    public toast: SharedToastService,
    public modalController: ModalController,
    public loading: SharedLoadingService,
    public route: ActivatedRoute,
  ) {

  }

  EmployeeList: any = [];
  DepartmentList: any = [];


  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentList=data;
    });
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmpList().subscribe(data => {
      this.EmployeeList = data;
      this.EmployeeListWithoutFilter = data;
    })
  }

  FilterFn(){
    var EmployeeIdFilter = this.EmployeeIdFilter;
    var EmployeeNameFilter = this.EmployeeNameFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function(el){
      return el.EmployeeId.toString().toLowerCase().includes(
        EmployeeIdFilter.toString().trim().toLowerCase()
      )&&
      el.EmployeeName.toString().toLowerCase().includes(
        EmployeeNameFilter.toString().trim().toLowerCase()
      )&&
      el.Department.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {
        // can pass data into modal here!
        modalType: 'add',
        DepartmentList: this.DepartmentList,

        modalConfig: {
          isAddEmp: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue = result.data.modalValue;
      this.modalType = result.data.modalType;

      this.EmployeeName = result.data.EmployeeName;
      this.Department = result.data.Department;
      this.DateOfJoining = result.data.DateOfJoining;
      this.PhotoFileName = result.data.PhotoFileName;
      
      if (this.modalValue == 'refuse') {
        this.refuse();
      }
      else {
        this.accept();
      }
    });
    return await modal.present();
  }

  async presentEditModal(item) {
    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {

        // can pass data into modal here!
        EmployeeId: item.EmployeeId,
        EmployeeName: item.EmployeeName,
        Department: item.Department,
        DateOfJoining: item.DateOfJoining,
        PhotoFileName: item.PhotoFileName,
        PhotoFilePath : this.service.PhotoUrl + item.PhotoFileName,

        modalType: 'edit',
        DepartmentList: this.DepartmentList,

        modalConfig: {
          isEditEmp: true,
        }
      },
    });

    modal.onDidDismiss().then((result: any) => {

      this.modalValue = result.data.modalValue;
      this.modalType = result.data.modalType;

      this.EmployeeId = result.data.EmployeeId;
      this.EmployeeName = result.data.EmployeeName;
      this.Department = result.data.Department;
      this.DateOfJoining = result.data.DateOfJoining;
      this.PhotoFileName = result.data.PhotoFileName;

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
        header: 'API Demo:',
        message: 'Cancel Adding New Employee!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
    else {
      this.toast.ToastInfo = {
        header: 'API Demo:',
        message: 'Cancel Editing Existing Employee!',
        color: 'warning',
      }
      this.toast.presentToast();
    }
  }

  accept() {
    this.loading.presentLoading();
    
    // seperate this between add new or edit existing.
    if (this.modalType == 'add') {
      var val = {
        EmployeeId:     this.EmployeeId,
        EmployeeName:   this.EmployeeName,
        Department:     this.Department,
        DateOfJoining:  this.DateOfJoining,
        PhotoFileName:  this.PhotoFileName
      };
      this.service.addEmployee(val).subscribe(res => {
        this.refreshEmpList();
      })
    }
    else if (this.modalType == 'edit') {
      var val = {
        EmployeeId:     this.EmployeeId,
        EmployeeName:   this.EmployeeName,
        Department:     this.Department,
        DateOfJoining:  this.DateOfJoining,
        PhotoFileName:  this.PhotoFileName
      };
      this.service.updateEmployee(val).subscribe(res => {
        this.refreshEmpList();
      })
    }
  }

  deleteEmp(item) {
    if (confirm('Are you sure?')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe(res => {
        this.refreshEmpList();

        this.toast.ToastInfo = {
          header: 'API Demo:',
          message: 'Deleted Employee!',
          color: 'success',
        }
        this.toast.presentToast();

      })
    }
  }


}
