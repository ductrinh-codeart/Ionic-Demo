import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SharedToastService } from '../shared-toast/shared-toast.service';

@Injectable({
  providedIn: 'root'
})
export class SharedLoadingService {

  constructor(
    public toast: SharedToastService,
    public loadingController: LoadingController,
    private router: Router,

  ) { 
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 2000,
      message: 'Vui lòng đợi...',
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.callToast();
  }

  // callToast(){
  //   if (this.router.url == "/tabs/tab9"){
  //     this.toast.ToastInfo = {
  //       header: 'API Demo:',
  //       message: 'Added to List!',
  //       color: 'success',
  //     }
  //     this.toast.presentToast();
  //   }
  //   else {
  //     this.toast.ToastInfo = {
  //       header: 'Biểu mẫu:',
  //       message: 'Đã xóa toàn bộ dữ liệu!',
  //       color: 'success',
  //     }
  //     this.toast.presentToast();
  //   }
  // }

  callToast(){
    this.toast.ToastInfo = {
      header: 'Biểu mẫu:',
      message: 'Đã xóa toàn bộ dữ liệu!',
      color: 'success',
    }
    this.toast.presentToast();
  }
}
