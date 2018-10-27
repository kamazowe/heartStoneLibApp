import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {

  private toast: any;

  constructor(private toastController: ToastController) {
  }

  public async presentToast() {
    const toast = await this.toastController.create({
      message: ' Your settings have been saved.',
      duration: 2000,
    });
    toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      closeButtonText: 'Done',
      duration: 3000,
      cssClass: 'toast-error',
    });

    toast.present();
  }
}
