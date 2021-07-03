import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../questions-group/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss'],
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;

  get isValid() { return this.form.controls[this.question.key].valid; }
  get name() { return this.form.get('name'); }
  get age() { return this.form.get('age'); }
  get sex() { return this.form.get('sex'); }
  get phone() { return this.form.get('phone'); }
  get email() { return this.form.get('email'); }
  get section() { return this.form.get('section'); }

  public errorMessages = {
    name: [
      { type: 'required', message: '*bắt buộc'},
      { type: 'pattern', message: "*Tên không được có số hoặc ký tự đặc biệt! < 40 kí tự "}
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
      { type: 'pattern', message: '*Bắt đầu bằng số 0! chỉ số, < 11 số'}
    ],
    email: [
      { type: 'required', message: '*bắt buộc'},
      { type: 'pattern', message: '*yourname, @company, .com, .com.vn'}
    ],
    section: [
      { type: 'required', message: '*bắt buộc'},
    ]
  }
  

}