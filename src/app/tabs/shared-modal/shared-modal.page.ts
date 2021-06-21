import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.page.html',
  styleUrls: ['./shared-modal.page.scss'],
})
export class SharedModalPage implements OnInit {

  @Input() name: string;
  @Input() sex: string;
  @Input() age: number;
  @Input() phone: any;
  @Input() email: any;
  @Input() address: any;
  @Input() code: any;

  buttonValue;

  constructor(
    public modalController: ModalController,
  ) {
  }

  ngOnInit() {
  }

  refuse() {
    this.buttonValue = 'refuse';
    this.dismiss();
  }

  accept() {
    this.buttonValue = 'accept';
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      modalValue: this.buttonValue,
    });
  }
}
