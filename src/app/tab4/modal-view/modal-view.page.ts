import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.page.html',
  styleUrls: ['./modal-view.page.scss'],
})
export class ModalViewPage implements OnInit {

  @Input() name: string;
  @Input() sex: string;
  @Input() age: number;
  @Input() phone: any;
  @Input() email: any;
  @Input() address: any;

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
