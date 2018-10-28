import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {

  private toast: any;

  constructor(private toastController: ToastController) {
  }

  public async presentToast() {
    this.toast = await this.toastController.create({
      message: ' Your settings have been saved.',
      duration: 2000,
    });
    this.toast.present();
  }

  async presentErrorToast(message: string) {
    this.toast = await this.toastController.create({
      message,
      position: 'top',
      closeButtonText: 'Done',
      duration: 3000,
      cssClass: 'toast-error',
    });

    this.toast.present();
  }
}
