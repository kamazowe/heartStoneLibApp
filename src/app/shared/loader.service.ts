import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {

  private loader: any;

  constructor(private loadingController: LoadingController) {
  }

  public async presentLoading() {
    this.loader = await this.loadingController.create({
      content: 'Please wait ...',
      translucent: true,
    });
    this.loader.present();

    return this.loader;
  }

  public dismissLoading() {
    if (this.loader) {
      this.loader.dismiss();
    }
  }
}
