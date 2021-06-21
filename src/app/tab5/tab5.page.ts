import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { SharedModalPage } from '../tabs/shared-modal/shared-modal.page';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page  {
  toggleview = true;
  listview = false;
  modalValue;

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private barcodeScanner: BarcodeScanner
  ) { }

  form = {
    name: '',
    phone: '',
    code: '',
  };

  ToastInfo = {
    message: '',
    color: '',
  }

  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;

  SubmittedArray: Array<object> = []


  
  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'QR_CODE,EAN_13,MSI,AZTEC,RSS_EXPANDED,RSS14,ITF,EAN_8,PDF_417,DATA_MATRIX,UPC_E,UPC_A,CODE_128,CODE_39,CODE_93,CODABAR ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {

      // alert(JSON.stringify(barcodeData.text));

      this.scannedData = barcodeData.text.slice(0, 15);

       this.ToastInfo = {
        message: 'Dữ liệu tìm thấy: ' + this.scannedData,
        color: 'success',
      }
      this.presentToast();
 
    }).catch(err => {
      console.log('Error', err);

      this.ToastInfo = {
        message: 'Không quét được! Lỗi: ' + err,
        color: 'danger',
      }
      this.presentToast();
    });
  }

  createBarcode() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData).then((encodedData) => {
      console.log(encodedData);
      this.encodedData = encodedData;
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }

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
    this.form.phone = this.registrationForm.controls.phone.value;
    this.form.code = this.registrationForm.controls.code.value;
    this.presentModal();
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: SharedModalPage,
      cssClass: 'modal-class',
      backdropDismiss: false,
      componentProps: {
        name: this.form.name,
        phone: this.form.phone,
        code: this.form.code,
        modalConfig: {
          isScanner : true,
        }
      },
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
      
      this.ToastInfo = {
        message: "Có lỗi trong biểu mẫu, vui lòng kiểm tra lại!",
        color: 'danger',
      }

      this.presentToast();
    }
  }

  accept() {
    console.log('Accepted!');
    console.log(this.registrationForm.value);
    this.SubmittedArray.push(this.registrationForm.value);
    this.ClearForm();

    this.ToastInfo = {
      message: 'Cảm ơn ' + this.form.name + ', biểu mẫu đã được lưu!',
      color: 'success',
    }

    this.presentToast();
  }

  ClearForm() {
    this.registrationForm.reset({
      'name': '',
      'phone': '',
      'code': '',
    });
    this.toggle();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Biểu mẫu:',
      message: this.ToastInfo.message,
      duration: 5000,
      position: 'bottom',
      color: this.ToastInfo.color,
      buttons: [
        {
          text: 'Done',
          role: 'accept',
          handler: () => {
            console.log('Accept clicked');
          }
        }
      ]
    });
    await toast.present();
    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  toggle(){
    this.toggleview = !this.toggleview;
  }

  togglelist() {
    this.toggleview = !this.toggleview;
    this.listview = !this.listview;
  }

  cancel(){
    this.ToastInfo = {
      message: 'Đã hủy xóa',
      color: 'warning',
    }
    this.presentToast();
    this.togglelist();
  }
  
  clearAll(){
    this.SubmittedArray = [];
    this.ToastInfo = {
      message: 'Đã xóa toàn bộ dữ liệu!',
      color: 'success',
    }
    this.presentToast();
    this.togglelist();
  }

  delete(){
    if(this.SubmittedArray.length !== 0){
      this.presentAlert();
    }
    else {
      this.ToastInfo = {
        message: 'Không có dữ liệu nào để xóa',
        color: 'warning',
      }
      this.presentToast();
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

  get name() {
    return this.registrationForm.get('name');
  }

  get phone() {
    return this.registrationForm.get('phone');
  }

  get code() {
    return this.registrationForm.get('code');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: '*bắt buộc'},
      { type: 'maxlength', message: "*Không được quá 40 ký tự! "},
      { type: 'pattern', message: "*Tên không được có số hoặc ký tự đặc biệt! "}
    ],
    phone: [
      { type: 'required', message: '*bắt buộc'},
      { type: 'maxlength', message: "*Số điện thoại không quá 11 số! "},
      { type: 'pattern', message: '*Nhập thông tin phù hợp! '}
    ],
    code: [
      { type: 'required', message: '*bắt buộc'},
      { type: 'pattern', message: '*Nhập thông tin phù hợp! '}
    ],
  }

//                                    These are allow special characters for name, from lowercase to UPPERCASE, numbers excepted, space allowed, min length = 0;
  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40), Validators.pattern("([a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵA-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ ]){0,}")]],
    phone: ['', [Validators.required, Validators.maxLength(11), Validators.pattern("^(0)[0-9]{9,}$")]],
    code: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9]){0,}")]],
  })
  
// Peter98's note:
//                                                                                                                     {0,10} << min is 0, and max is 10 character;
// Phone: Validators.pattern('(0)[- +()0-9]{9,}') >>>> Expanded for space:  .pattern('(0)           [- +()0-9]          {9,}') << fixed-length by remove 'comma: ,'
//                Original                                                 must start with 0      accepted character   min-length   

// Name: Validators.pattern('^[a-z A-Z]{0,}')   >>>> Expanded for space:  .pattern('^[a-z A-Z]                                                       {0,}')
//                Original                                        characters inside array are allowed, even a space is counted, beware!           min-length

}
