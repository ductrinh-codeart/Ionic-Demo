import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../tab6/questions-group/question.service';
import { QuestionBase } from '../tab6/questions-group/question-base';
import { Observable } from 'rxjs';
import { SharedToastService } from '../tabs/shared-toast/shared-toast.service';
import { SharedLoadingService } from '../tabs/shared-loading/shared-loading.service';
import { AlertController, ModalController } from '@ionic/angular';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
  providers:  [QuestionService],
})
export class Tab6Page implements OnInit {

  toggleview = true;
  listview = false;
  modalValue;

  questions$: Observable<QuestionBase<any>[]>;

  constructor(
    service: QuestionService,
    public toast: SharedToastService,
    public loading: SharedLoadingService,
    public modalController: ModalController,
    public alertController: AlertController,
    ) {
    this.questions$ = service.getQuestions();
   }

  ngOnInit() {
  }

  SubmittedArray: Array<object> = []
  
  togglelist() {
    this.toggleview = !this.toggleview;
    this.listview = !this.listview;
  }
  
}
