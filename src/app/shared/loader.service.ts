import { Injectable } from '@angular/core';
import { HTMLIonOverlayElement } from '@ionic/angular/dist/types/utils/overlays-interface';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {

  private loader: HTMLIonOverlayElement;

  constructor(private loadingController: LoadingController) {
  }

  public async presentLoading(): Promise<HTMLIonOverlayElement> {
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
