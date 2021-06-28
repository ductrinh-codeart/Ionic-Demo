export class QuestionBase<T> {
    value: T|undefined;
    key: string;
    label: string;
    ranged: boolean;
    pattern: string;
    required: boolean;
    placeholder: string;
    order: number;
    controlType: string;
    type: string;
    options: {key: string, value: string, color: string}[];
  
    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        ranged?: boolean;
        pattern?: string;
        required?: boolean;
        placeholder?: string;
        order?: number;
        controlType?: string;
        type?: string;
        options?: {key: string, value: string, color: string}[];
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.ranged = !!options.ranged;
      this.pattern = options.pattern || '';
      this.required = !!options.required;
      this.placeholder = options.placeholder || '';
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.options = options.options || [];
    }
  }