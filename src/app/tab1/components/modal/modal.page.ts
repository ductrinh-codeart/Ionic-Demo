import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InnermodalPage } from './innermodal/innermodal.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {

  constructor(public modalController: ModalController) {

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: InnermodalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
}
}
