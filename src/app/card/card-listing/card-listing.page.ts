import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';
import { Observable } from 'rxjs';
import { Card } from '../shared/card.model';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

  cardDeckGroup: string;
  cardDeck: string;
  cards$: Observable<Card[]>;

  constructor(private cardService: CardService,
              private activatedRoute: ActivatedRoute) {
  }

  ionViewWillEnter(): void {
    this.cardDeckGroup = this.activatedRoute.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.activatedRoute.snapshot.paramMap.get('cardDeck');
    this.cards$ = this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck);
  }
}
