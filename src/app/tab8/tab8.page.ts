import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SharedToastService } from '../tabs/shared-toast/shared-toast.service';

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
})
export class Tab8Page implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public toast: SharedToastService
    ) { }

  ngOnInit() {
      this.dynamicForm = this.formBuilder.group({
          numberOfTickets: ['', Validators.required],
          tickets: new FormArray([])
      });
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }
  get ticketFormGroups() { return this.t.controls as FormGroup[]; }

  onChangeTickets(e) {
      const numberOfTickets = e.target.value || 0;
      if (this.t.length < numberOfTickets) {
          for (let i = this.t.length; i < numberOfTickets; i++) {
              this.t.push(this.formBuilder.group({
                  name: ['', [Validators.required,Validators.pattern("([a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵA-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ ]){0,}")]],
                  email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@+([a-zA-Z0-9.-])+[.]+[a-zA-Z]{2,4}$')]]
              }));
          }
      } else {
          for (let i = this.t.length; i >= numberOfTickets; i--) {
              this.t.removeAt(i);
          }
      }
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.dynamicForm.invalid) {
          return;
      }

      debugger
      // display form values on success
      console.log(this.dynamicForm.value);

      this.toast.ToastInfo = {
        header: "Biểu mẫu:",
        message: "Đã mua thành công " + this.dynamicForm.value.numberOfTickets + " vé! Người mua: " + this.dynamicForm.value.tickets[0].name,
        color: 'success',
      }

      this.toast.presentToast();
    
      this.onClear();
  }

  onReset() {
      // reset whole form back to initial state
      this.submitted = false;
      this.dynamicForm.reset();
      this.t.clear();
  }

  onClear() {
      // clear errors and reset ticket fields
      this.submitted = false;
      this.t.reset();
  }
}