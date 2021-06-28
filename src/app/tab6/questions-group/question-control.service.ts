import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.ranged   ? new FormControl(question.value || '', [Validators.min(18), Validators.max(65),])
                                              : new FormControl(question.value || '');
    });

    return new FormGroup(group);
  }

  
}