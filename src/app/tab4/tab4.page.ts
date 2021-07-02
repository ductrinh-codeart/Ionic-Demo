import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SharedLoadingService } from '../tabs/shared-loading/shared-loading.service';
import { SharedModalPage } from '../tabs/shared-modal/shared-modal.page';
import { SharedToastService } from '../tabs/shared-toast/shared-toast.service'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  toggleview = true;
  listview = false;
  modalValue;

  constructor(
    public toast: SharedToastService,
    public loading: SharedLoadingService,
    public modalController: ModalController,
    public alertController: AlertController,
    private formBuilder: FormBuilder
  ) { }

  form = {
    name: '',
    sex: '',
    age: '',
    phone: '',
    email: '',
    addresses: {},
  };

  SubmittedArray: Array<object> = []

  Submit() {
    this.toggle();
    if (this.registrationForm.status !== "INVALID") {
      this.SetNewValue();
    }
    else {
      this.refuse();
    }
  }

  SetNewValue() {
    this.form.name = this.registrationForm.controls.name.value;
    this.form.sex = this.registrationForm.controls.sex.value;
    this.form.age = this.registrationForm.controls.age.value;
    this.form.phone = this.registrationForm.controls.phone.value;
    this.form.email = this.registrationForm.controls.email.value;
    this.form.addresses = this.registrationForm.controls.addresses.value;
    this.presentModal();
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {
        name: this.form.name,
        sex: this.form.sex,
        age: this.form.age,
        phone: this.form.phone,
        email: this.form.email,
        addresses: this.form.addresses,
        modalConfig: {
          isFormInput : true,
        }
      }
    });

    modal.onDidDismiss().then((result: any) => {
      this.modalValue = result.data.modalValue;
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
    this.toggle();

    if (this.registrationForm.status !== "INVALID") {
      console.log('Return');
    }
    else {
      console.log('Refused!');
      this.registrationForm.markAllAsTouched();
      
      this.toast.ToastInfo = {
        header: "Biểu mẫu:",
        message: "Có lỗi trong biểu mẫu, vui lòng kiểm tra lại!",
        color: 'danger',
      }

      this.toast.presentToast();
    }
  }

  accept() {
    console.log('Accepted!');
    console.log(this.registrationForm.value);
    this.SubmittedArray.push(this.registrationForm.value);
    this.ClearForm();

    this.toast.ToastInfo = {
      header: 'Biểu mẫu:',
      message: 'Cảm ơn ' + this.form.name + ', biểu mẫu đã được lưu!',
      color: 'success',
    }

    this.toast.presentToast();
  }

  ClearForm() {
    this.registrationForm.reset({
      'name': '',
      'sex': '',
      'age': '',
      'phone': '',
      'email': '',
      'addresses': {},
    });
    this.toggle();
  }

  toggle(){
    this.toggleview = !this.toggleview;
  }

  togglelist() {
    this.toggleview = !this.toggleview;
    this.listview = !this.listview;
  }

  cancel(){
    this.toast.ToastInfo = {
      header: 'Biểu mẫu:',
      message: 'Đã hủy xóa',
      color: 'warning',
    }
    this.toast.presentToast();
    this.togglelist();
  }
  
  clearAll(){
    this.loading.presentLoading();
    this.SubmittedArray = [];
    this.togglelist();
  }

  delete(){
    if(this.SubmittedArray.length !== 0){
      this.presentAlert();
    }
    else {
      this.toast.ToastInfo = {
        header: 'Biểu mẫu:',
        message: 'Không có dữ liệu nào để xóa',
        color: 'warning',
      }
      this.toast.presentToast();
      this.toggle();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      backdropDismiss: false,
      header: 'Cảnh Báo',
      message: 'Bạn có đồng ý xóa toàn bộ biểu mẫu?',
      buttons: [
        {
          text: 'Hủy xóa',
          handler: () => {
            console.log('Hủy xóa');
            this.cancel();
          }
        }, {
          text: 'Xóa!',
          handler: () => {
            console.log('Đã xóa');
            this.clearAll();
          }
        }
      ]
    });

    await alert.present();
  }

  addAddress() {
    const newAddress = this.formBuilder.group({
      address: ['', [Validators.required, Validators.maxLength(80), Validators.pattern("([0-9a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵA-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ/,. ]){0,}")]]
    });
  
    this.addresses.push(newAddress);
  }

  deleteAddress(addressIndex: number) {
    this.addresses.removeAt(addressIndex);
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get sex() {
    return this.registrationForm.get('sex');
  }

  get age() {
    return this.registrationForm.get('age');
  }

  get phone() {
    return this.registrationForm.get('phone');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get addresses() {
    return this.registrationForm.controls['addresses'] as FormArray;
  }

  public errorMessages = {
    name: [
      { type: 'required', message: '*bắt buộc'},
      { type: 'maxlength', message: "*Không được quá 40 ký tự! "},
      { type: 'pattern', message: "*Tên không được có số hoặc ký tự đặc biệt! "}
    ],
    sex: [
      { type: 'required', message: '*bắt buộc'},
    ],
    age: [
      { type: 'required', message: '*bắt buộc'},
      { type: 'min', message: "*Bạn không đủ tuổi..."},
      { type: 'max', message: "*Bạn già thế à!? "}
    ],
    phone: [
      { type: 'required', message: '*bắt buộc'},
      { type: 'maxlength', message: "*Số điện thoại không quá 11 số! "},
      { type: 'pattern', message: '*Nhập thông tin phù hợp! '}
    ],
    email: [
      { type: 'required', message: '*bắt buộc'},
      { type: 'pattern', message: '*Nhập thông tin phù hợp! '}
    ],
    addresses: [
      { type: 'required', message: '*bắt buộc'},
      { type: 'maxlength', message: "*Không được quá 80 ký tự! "},
      { type: 'pattern', message: '*Nhập thông tin phù hợp! '}
    ]
  }

//                                    These are allow special characters for name, from lowercase to UPPERCASE, numbers excepted, space allowed, min length = 0;
  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40), Validators.pattern("([a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵA-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ ]){0,}")]],
    sex: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
    phone: ['', [Validators.required, Validators.maxLength(11), Validators.pattern("^(0)[0-9]{9,}$")]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@+([a-zA-Z0-9.-])+[.]+[a-zA-Z]{2,4}$')]],
    addresses: this.formBuilder.array([]),
  })
  
// Peter98's note:
//                                                                                                                     {0,10} << min is 0, and max is 10 character;
// Phone: Validators.pattern('(0)[- +()0-9]{9,}') >>>> Expanded for space:  .pattern('(0)           [- +()0-9]          {9,}') << fixed-length by remove 'comma: ,'
//                Original                                                 must start with 0      accepted character   min-length   

// Name: Validators.pattern('^[a-z A-Z]{0,}')   >>>> Expanded for space:  .pattern('^[a-z A-Z]                                                       {0,}')
//                Original                                        characters inside array are allowed, even a space is counted, beware!           min-length

}
