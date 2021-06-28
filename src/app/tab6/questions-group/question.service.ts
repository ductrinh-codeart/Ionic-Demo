import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { RangeQuestion } from './question-range';
import { RadioQuestion } from './question-radio';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: QuestionBase<string>[] = [

      new TextboxQuestion({
        key: 'name',
        label: 'Tên',
        placeholder: 'Nhập họ tên',
        required: true,
        pattern: "([a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵA-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ ]){0,40}",
        order: 1
      }),

      new RangeQuestion({
        key: 'age',
        label: 'Tuổi',
        ranged: true,
        required: true,
        order: 2
      }),
      
      new DropdownQuestion({
        key: 'sex',           
        label: 'Giới tính',
        options: [
          { key: 'nam', value: 'Nam', color: 'success' },
          { key: 'nữ', value: 'Nữ', color: 'danger' },
          { key: 'khác', value: 'Khác', color: 'dark' },
        ],
        required: true,
        order: 3
      }),

      new TextboxQuestion({
        key: 'phone',
        label: 'Số điện thoại',
        placeholder: 'Nhập số điện thoại',
        type: 'tel',
        required: true,
        pattern: "^(0)[0-9]{9,10}$",
        order: 4
      }),

      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        placeholder: 'Ví dụ: duc.trinh@gmail.com',
        type: 'email',
        required: true,
        pattern: '^[a-zA-Z0-9._%+-]+@+([a-zA-Z0-9.-])+[.]+[a-zA-Z]{2,4}$',
        order: 5
      }),


      new DropdownQuestion({
        key: 'section',
        label: 'Khu vực:',
        options: [
          { key: 'miền bắc', value: 'Miền Bắc', color: 'success' },
          { key: 'miền trung', value: 'Miền Trung', color: 'danger' },
          { key: 'miền nam', value: 'Miền Nam', color: 'dark' },
        ],
        required: true,
        order: 6
      }),

    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}