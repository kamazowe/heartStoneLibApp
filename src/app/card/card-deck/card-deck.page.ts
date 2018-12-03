import { Component } from '@angular/core';
import { CardService } from '../shared/card.service';
import { Observable } from 'rxjs';
import { CardDeck } from '../shared/card.model';

@Component({
  selector: 'app-card-deck',
  templateUrl: 'card-deck.page.html',
  styleUrls: ['card-deck.page.scss'],
})
export class CardDeckPage {

  cardDecks: Observable<CardDeck[]>;

  constructor(private cardService: CardService) {
    this.cardDecks = cardService.getAllCardDecks();
  }


  generateUrl(cardDeckGroup: string, cardDeck: string): string {
    return `tabs/(card:card/${cardDeckGroup}/${cardDeck})`;
  }
}
