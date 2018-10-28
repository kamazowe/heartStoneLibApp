import { Component } from '@angular/core';
import { CardService } from '../shared/card.service';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../shared/card.model';
import { LoaderService } from '../../shared/loader.service';
import { ToastService } from '../../shared/toast.service';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage {

  cardId: string;
  card: Card;
  sub: any;

  constructor(private activatedRoute: ActivatedRoute,
              private cardService: CardService,
              private loaderService: LoaderService,
              private toastService: ToastService,
              private alertService: AlertService) {
  }

  async ionViewWillEnter() {
    this.cardId = this.activatedRoute.snapshot.paramMap.get('cardId');
    this.loaderService.presentLoading();
    this.sub = this.cardService.getCardById(this.cardId).subscribe((responseCard: Card) => {
      const card = responseCard;
      card.text = this.cardService.replaceCardTextLine(card.text);
      this.card = card;

      this.loaderService.dismissLoading();
    }, () => {
      this.loaderService.dismissLoading();
      this.alertService.presentErrorAlert('Connection Error, please reload the page ');
    });
  }

  private ionViewDidLeave() {
    this.sub.unsubscribe();
  }

  updateImage(event: Event) {
    // fixme
    // this.card.img = 'assets/images/DefaultCard.png';
  }
}
