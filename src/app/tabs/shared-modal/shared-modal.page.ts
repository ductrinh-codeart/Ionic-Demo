import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedService } from '../../tab9/shared.service';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.page.html',
  styleUrls: ['./shared-modal.page.scss'],
})
export class SharedModalPage implements OnInit {

  @Input() name: string;
  @Input() sex: string;
  @Input() age: number;
  @Input() phone: any;
  @Input() phones: any;
  @Input() email: any;
  @Input() addresses: any;
  @Input() code: any;
  @Input() color: any;
  @Input() bgcolor: any;

  //Get data pass in for Department ( when Edit )
  @Input() modalType: any;
  @Input() DepartmentId: any;
  @Input() DepartmentName: any;

  //Get data pass in for Employee ( when Edit )
  @Input() DepartmentList: any;
  @Input() EmployeeId: any;
  @Input() EmployeeName: any;
  @Input() Department: any;
  @Input() DateOfJoining: any;
  @Input() PhotoFileName: any;
  @Input() PhotoFilePath: any;

  //Get data pass in for Task ( when Edit )
  @Input() StatusList: any;
  @Input() PriorityList: any;
  @Input() TaskId: any;
  @Input() TaskName: any;
  @Input() Description: any;
  @Input() CreateOn: any;
  @Input() Estimate: any;
  @Input() CompleteOn: any;
  @Input() StatusId: any;
  @Input() PriorityId: any;

  modalConfig = null;
  _modalConfig = {
    isScanner : false,
    scannerPageLabel: 'Scanner Demo',

    isFormInput: false,
    formInputLabel: 'Form Input Demo',

    isAddDep: false,
    AddDepLabel: 'Add Departmant',

    isEditDep: false,
    EditDepLabel: 'Edit Department',

    isAddEmp: false,
    AddEmpLabel: 'Add Employee',

    isEditEmp: false,
    EditEmpLabel: 'Edit Employee',

    isAddTask: false,
    AddTaskLabel: 'Add Task',

    isEditTask: false,
    EditTaskLabel: 'Edit Task',
  }

  buttonValue;

  constructor(
    public modalController: ModalController,
    private service: SharedService,
  ) {
  }

  ngOnInit() {
    this.modalConfig = Object.assign(this._modalConfig, this.modalConfig);
  }

  refuse() {
    this.buttonValue = 'refuse';
    this.dismiss();
  }

  accept() {
    this.buttonValue = 'accept';
    this.dismiss();
  }

  uploadPhoto(event){
    debugger
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = (this.service.PhotoUrl + this.PhotoFileName).toString();
    })
  }


  //fix this! Seperate out!
  dismiss() {
    this.modalController.dismiss({
      modalValue: this.buttonValue,
      modalType: this.modalType,

      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName,

      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,

      TaskId: this.TaskId,
      TaskName: this.TaskName,
      Description: this.Description,
      CreateOn: this.CreateOn,
      Estimate: this.Estimate,
      CompleteOn: this.CompleteOn,
      StatusId: this.StatusId,
      PriorityId: this.PriorityId,
    });
  }
}
