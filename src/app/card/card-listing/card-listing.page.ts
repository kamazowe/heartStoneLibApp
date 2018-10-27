import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';
import { Card } from '../shared/card.model';
import { LoaderService } from '../../shared/loader.service';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

  cardDeckGroup: string;
  cardDeck: string;
  cards: Card[] = [];
  sub: any;

  constructor(private cardService: CardService,
              private activatedRoute: ActivatedRoute,
              private loaderService: LoaderService) {
  }

  async ionViewWillEnter() {
    this.cardDeckGroup = this.activatedRoute.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.activatedRoute.snapshot.paramMap.get('cardDeck');
    this.loaderService.presentLoading();

    this.sub = this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck)
        .subscribe((cards: Card[]) => {
          this.cards = cards.map((card: Card) => {
            card.text = this.cardService.replaceCardTextLine(card.text);

            return card;
          });
          this.loaderService.dismissLoading();
        });
  }

  private ionViewDidLeave() {
    this.sub.unsubscribe();
  }
}
