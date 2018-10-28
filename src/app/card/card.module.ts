import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardDeckPage } from './card-deck/card-deck.page';
import { CardService } from './shared/card.service';
import { HttpClientModule } from '@angular/common/http';
import { CardListComponent } from './components/card-list.component';
import { CardListingPage } from './card-listing/card-listing.page';
import { CardDetailPage } from './card-detail/card-detail.page';
import { LoaderService } from '../shared/loader.service';
import { ToastService } from '../shared/toast.service';
import { AlertService } from '../shared/alert.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([{path: '', component: CardDeckPage}]),
  ],
  providers: [
    AlertService,
    LoaderService,
    CardService,
    ToastService,
  ],
  declarations: [
    CardDeckPage,
    CardListingPage,
    CardListComponent,
    CardDetailPage,
  ],
})
export class CardModule {
}
