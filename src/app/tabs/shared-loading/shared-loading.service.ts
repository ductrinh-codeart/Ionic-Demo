import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SharedToastService } from '../shared-toast/shared-toast.service';

@Injectable({
  providedIn: 'root'
})
export class SharedLoadingService {

  constructor(
    public toast: SharedToastService,
    public loadingController: LoadingController,
  ) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 2000,
      message: 'Vui lòng đợi..',
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.toast.ToastInfo = {
      header: 'Biểu mẫu:',
      message: 'Đã xóa toàn bộ dữ liệu!',
      color: 'success',
    }
    this.toast.presentToast();
  }
}
