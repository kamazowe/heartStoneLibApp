import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {

  ionViewWillEnter(): void {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
  }


  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }


  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }
}
