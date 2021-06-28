import { QuestionBase } from './question-base';

export class RangeQuestion extends QuestionBase<string> {
  controlType = 'range';
}