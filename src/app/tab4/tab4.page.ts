import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  inputform = true;
  submitform = false;

  constructor(
    public toastController: ToastController,
    private formBuilder: FormBuilder
  ) { }

  form = {
    name: '',
    sex: '',
    age: '',
    phone: '',
    email: '',
    address: '',
  };

  ToastInfo = {
    message: '',
    color: '',
  }

  SubmittedArray: Array<object> = []

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

  get address() {
    return this.registrationForm.get('address');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: '*required '},
      { type: 'maxlength', message: "Name can't be more than 40 characters! "},
      { type: 'pattern', message: "Name can't have other characters or numbers! "}
    ],
    sex: [
      { type: 'required', message: '*required '},
    ],
    age: [
      { type: 'required', message: '*required '},
      { type: 'min', message: "You aren't old enough.. "},
      { type: 'max', message: "You can't be that old!? "}
    ],
    phone: [
      { type: 'required', message: '*required '},
      { type: 'maxlength', message: "Phone number can't be longer than 12 characters! "},
      { type: 'pattern', message: 'Please enter a valid phone number! '}
    ],
    email: [
      { type: 'required', message: '*required '},
      { type: 'pattern', message: 'Please enter a valid email address! '}
    ],
    address: [
      { type: 'required', message: '*required '},
      { type: 'maxlength', message: "Address can't be longer than 80 characters! "},
      { type: 'pattern', message: 'Please enter a valid address! '}
    ]
  }
//                                    These are allow special characters for name, from lowercase to UPPERCASE, numbers excepted, space allowed, min length = 0;
  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40), Validators.pattern("([a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵA-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ ]){0,}")]],
    sex: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
    phone: ['', [Validators.required, Validators.maxLength(12), Validators.pattern("^((\\+84?)|0)?[0-9]{10,}")]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
    address: ['', [Validators.required, Validators.maxLength(80), Validators.pattern("([0-9a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵA-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ/,. ]){0,}")]],
  })
  
// Peter98's note:
//                                                                                                                     {0,10} << min is 0, and max is 10 character;
// Phone: Validators.pattern('(0)[- +()0-9]{9,}') >>>> Expanded for space:  .pattern('(0)           [- +()0-9]          {9,}') << fixed-length by remove 'comma: ,'
//                Original                                                 must start with 0      accepted character   min-length   

// Name: Validators.pattern('^[a-z A-Z]{0,}')   >>>> Expanded for space:  .pattern('^[a-z A-Z]                                                       {0,}')
//                Original                                        characters inside array are allowed, even a space is counted, beware!           min-length


  Submit() {
    this.inputform = !this.inputform;
    this.submitform = !this.submitform;
    if (this.registrationForm.status !== "INVALID") {
      this.SetNewValue();
    }
    else {
      this.refuse();
    }
  }

  refuse() {
    this.inputform = !this.inputform;
    this.submitform = !this.submitform;

    if (this.registrationForm.status !== "INVALID") {
      console.log('Return');
    }
    else {
      console.log('Refused!');
      this.registrationForm.markAllAsTouched();
      
      this.ToastInfo = {
        message: "There are errors in the form, please check again!",
        color: 'danger',
      }

      this.presentToast();
    }
  }

  accept() {
    console.log('Accepted!');
    console.log(this.registrationForm.value);
    this.SubmittedArray.push(this.registrationForm);
    this.ClearForm();

    this.ToastInfo = {
      message: 'Thanks ' + this.form.name + ', form has been saved!',
      color: 'success',
    }

    this.presentToast();
  }

  SetNewValue() {
    this.form.name = this.registrationForm.controls.name.value;
    this.form.sex = this.registrationForm.controls.sex.value;
    this.form.age = this.registrationForm.controls.age.value;
    this.form.phone = this.registrationForm.controls.phone.value;
    this.form.email = this.registrationForm.controls.email.value;
    this.form.address = this.registrationForm.controls.address.value;
  }

  ClearForm() {
    this.registrationForm.reset({
      'name': '',
      'sex': '',
      'age': '',
      'phone': '',
      'email': '',
      'address': '',
    });
    this.inputform = !this.inputform;
    this.submitform = !this.submitform;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Form Input:',
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
}
