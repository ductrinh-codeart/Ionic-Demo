import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SharedToastService } from '../tabs/shared-toast/shared-toast.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public base64Image: string;
  public photoAlbum: Array<string> = [];

  note: string = 'To use camera, run "Ionic cdv run android --livereload" with a connected android device, since it need to be run in cordova environment!';

  constructor(
    private camera: Camera,
    public toast: SharedToastService,
    public actionSheetController: ActionSheetController,
  ) {

  }

  public async showActionSheet(i) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      backdropDismiss: false,
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoAlbum.splice(i, 1);

          this.toast.ToastInfo = {
            header: "Máy ảnh:",
            message: "Đã xóa tấm hình!",
            color: 'success',
          };
          this.toast.presentToast();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.toast.ToastInfo = {
            header: "Máy ảnh:",
            message: "Đã hủy chức năng xóa!",
            color: 'warning',
          };
          this.toast.presentToast();
        }
      }]
    });
    await actionSheet.present();
  }

  options: CameraOptions = {
    quality: 100,
    sourceType: 1,
    saveToPhotoAlbum: true,
    correctOrientation: true,
    mediaType: this.camera.MediaType.PICTURE,
    encodingType: this.camera.EncodingType.JPEG,
    destinationType: this.camera.DestinationType.DATA_URL,
  }

  addPhotoToGallery() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;

      // this.toast.ToastInfo = {
      //   header: "Máy ảnh:",
      //   message: "Hình đã được lưu!",
      //   color: 'success',
      // };
      // this.toast.presentToast();
      
      this.photoAlbum.push(this.base64Image);
    }, (err) => {
      this.toast.ToastInfo = {
        header: "Máy ảnh:",
        message: "Đã có lỗi" + err,
        color: 'warning',
      };
      this.toast.presentToast();
    });
  }
}
