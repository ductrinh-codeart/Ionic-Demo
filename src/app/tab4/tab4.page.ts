import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  constructor(
    private formBuilder: FormBuilder
  ) { }

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
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: "Name can't be more than 10 characters!" }
    ],
    age: [
      { type: 'required', message: 'Age is required' },
      { type: 'max', message: "You can't be that old!?" }
    ],
    phone: [
      { type: 'required', message: 'Phone is required' },
      { type: 'maxlength', message: "Phone number can't be longer than 11 characters!" }
    ],
    email: [
      { type: 'required', message: 'Email number is required' },
      { type: 'pattern', message: 'Please enter a valid email address!' }
    ],
    address: [
      { type: 'required', message: 'Address is required' },
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
    console.log(this.registrationForm.value);
    this.ClearForm();
  }

  ClearForm() {
    this.registrationForm.reset({
      'name': '',
      'age': '',
      'phone': '',
      'email': '',
      'address': '',
    })
  }

}
