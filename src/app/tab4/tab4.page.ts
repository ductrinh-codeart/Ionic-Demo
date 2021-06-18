import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  inputform = true;
  submitform = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  form = {
    name: '',
    age: '',
    phone: '',
    email: '',
    address: '',
  };

  get name() {
    return this.registrationForm.get('name');
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
      { type: 'required', message: '*required' },
      { type: 'maxlength', message: "Name can't be more than 10 characters!" }
    ],
    age: [
      { type: 'required', message: '*required' },
      { type: 'max', message: "You can't be that old!?" }
    ],
    phone: [
      { type: 'required', message: '*required' },
      { type: 'maxlength', message: "Phone number can't be longer than 11 characters!" }
    ],
    email: [
      { type: 'required', message: '*required' },
      { type: 'pattern', message: 'Please enter a valid email address!' }
    ],
    address: [
      { type: 'required', message: '*required' },
      { type: 'maxlength', message: "Address can't be longer than 30 characters" }
    ]
  }

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(10)]],
    age: ['', [Validators.required, Validators.max(150)]],
    phone: ['', [Validators.required, Validators.maxLength(11)]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
    address: ['', [Validators.required, Validators.maxLength(30)]],
  })

  Submit() {
    this.inputform = !this.inputform;
    this.submitform = !this.submitform;
    this.SetNewValue();
  }

  refuse() {
    this.inputform = !this.inputform;
    this.submitform = !this.submitform;
    console.log('Refused!');
  }

  accept() {
    console.log('Accepted!');
    console.log(this.registrationForm.value);
    this.ClearForm();
  }

  SetNewValue() {
    if ( this.registrationForm.controls.name.value == "") {
      this.form.name = 'Empty'
    }
    else { this.form.name = this.registrationForm.controls.name.value};

    if ( this.registrationForm.controls.age.value == "") {
      this.form.age = 'Empty'
    }
    else { this.form.age = this.registrationForm.controls.age.value};

    if ( this.registrationForm.controls.phone.value == "") {
      this.form.phone = 'Empty'
    }
    else { this.form.phone = this.registrationForm.controls.phone.value};

    if ( this.registrationForm.controls.email.value == "") {
      this.form.email = 'Empty'
    }
    else { this.form.email = this.registrationForm.controls.email.value};

    if ( this.registrationForm.controls.address.value == "") {
      this.form.address = 'Empty'
    }
    else { this.form.address = this.registrationForm.controls.address.value};
  }

  ClearForm() {
    this.registrationForm.reset({
      'name': '',
      'age': '',
      'phone': '',
      'email': '',
      'address': '',
    });
    this.inputform = !this.inputform;
    this.submitform = !this.submitform;
  }
  
}
