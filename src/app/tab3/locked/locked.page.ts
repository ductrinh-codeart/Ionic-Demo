import { Component, OnInit } from '@angular/core';
import { Plugins } from  '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { SharedToastService } from '../../tabs/shared-toast/shared-toast.service';

const { BiometricAuth } = Plugins;

@Component({
  selector: 'app-locked',
  templateUrl: './locked.page.html',
  styleUrls: ['./locked.page.scss'],
})
export class LockedPage implements OnInit {

  backdrop:'static';
  showFallback = true;
  password = '';
  hasBiometricAuth = false;

  constructor(
    private modalCtrl: ModalController,
    public toast: SharedToastService,
    ) {
    
   }

  async ngOnInit() {
    const available = await BiometricAuth.isAvailable();
    this.hasBiometricAuth = available.has;
    if (this.hasBiometricAuth) {
      this.openBiometricAuth();
    }
  }

  async openBiometricAuth() {
    const authResult = await BiometricAuth.verify (
      {
        reason: 'Your session timed out',
        title: 'Your session timed out',
      }
    );
    if (authResult.verified) {
      this.dismissLockScreen();
    }    
  }

  unlock () {
    if (this.password == '0109') {
      this.toast.ToastInfo = {
        header: "Security Check:",
        message: "Mật khẩu chính xác!",
        color: 'success',
      }

      this.toast.presentToast();
      this.dismissLockScreen();
    }
    else {
      this.toast.ToastInfo = {
        header: "Security Check:",
        message: "Mật khẩu không đúng, vui lòng kiểm tra lại!",
        color: 'danger',
      }

      this.toast.presentToast();
    }
  }

  dismissLockScreen() {
    this.modalCtrl.dismiss({reset: true});
  }
}
