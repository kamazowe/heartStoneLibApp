import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable()
export class AlertService {

  private alert: any;

  constructor(private alertController: AlertController) {
  }

  async presentErrorAlert(message: string) {
    this.alert = await this.alertController.create({
      header: 'Alert',
      message,
      buttons: ['OK'],
    });
    this.alert.present();
  }


}
