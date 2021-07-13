import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  @Input() modalType: any;
  @Input() DepartmentId: any;
  @Input() DepartmentName: any;

  modalConfig = null;
  _modalConfig = {
    isScanner : false,
    scannerPageLabel: 'Scanner Demo',

    isFormInput: false,
    formInputLabel: 'Form Input Demo',

    isAPIDemo: false,
    APIDemoLabel: 'API Demo',

    isEditDep: false,
    EditDepLabel: 'Edit Department',
  }

  buttonValue;

  constructor(
    public modalController: ModalController,
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

  dismiss() {
    this.modalController.dismiss({
      modalValue: this.buttonValue,
      modalType: this.modalType,
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName,
    });
  }
}
