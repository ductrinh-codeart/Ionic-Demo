import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { SharedLoadingService } from '../../tabs/shared-loading/shared-loading.service';
import { SharedToastService } from '../../tabs/shared-toast/shared-toast.service';

import { QuestionBase } from '../questions-group/question-base';
import { QuestionControlService } from '../questions-group/question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {


  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = {
    name: '',
    sex: '',
    age: '',
    phone: '',
    email: '',
    section: '',
  };

  constructor(
    private qcs: QuestionControlService,
    public toast: SharedToastService,
    public loading: SharedLoadingService,
    public modalController: ModalController,
    public alertController: AlertController,
    ) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    if ( this.form.valid ) {
    this.payLoad = this.form.getRawValue();
    debugger
    console.log(this.payLoad);

    this.toast.ToastInfo = {
      header: 'Biểu mẫu:',
      message: 'Cảm ơn ' + this.payLoad.name + ', biểu mẫu đã được lưu!',
      color: 'success',
    }

    this.toast.presentToast();
  }
  else {
    this.form.markAllAsTouched();
    this.toast.ToastInfo = {
      header: 'Biểu mẫu:',
      message: 'Có lỗi trong biểu mẫu, vui lòng kiểm tra lại!',
      color: 'danger',
    }

    this.toast.presentToast();

  }

}

}