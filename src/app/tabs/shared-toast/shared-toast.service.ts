import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedToastService {

  ToastInfo = {
    header: '',
    message: '',
    color: '',
  }

  constructor(
    public toastController: ToastController,
  ) { }

  async presentToast() {
    const toast = await this.toastController.create({
      header: this.ToastInfo.header,
      message: this.ToastInfo.message,
      duration: 4000,
      position: 'bottom',
      color: this.ToastInfo.color,
      buttons: [
        {
          text: 'Done',
          role: 'accept',
          handler: () => {
            console.log('Accept clicked');
          }
        }
      ]
    });
    await toast.present();
    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
