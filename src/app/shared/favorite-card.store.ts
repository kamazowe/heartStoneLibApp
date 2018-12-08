import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../card/shared/card.model';
import { Storage } from '@ionic/storage';


@Injectable()
export class FavoriteCardStore {
  private _favoriteCardsSubject = new BehaviorSubject({});

  constructor(private storage: Storage) {
    this.loadInitialData();
  }

  get favoriteCards$(): Observable<any> {
    return this._favoriteCardsSubject.asObservable();
  }

  private loadInitialData() {
    this.storage.get('favoriteCards').then(favorite => {
      this._favoriteCardsSubject.next(favorite || {});

      const a = this._favoriteCardsSubject.getValue();
    });
  }

  toggleCard(card: Card) {
    const favoriteCards = this._favoriteCardsSubject.getValue();

    if (card.favorite) {
      delete favoriteCards[card.cardId];
      card.favorite = false;
    } else {
      card.favorite = true;
      favoriteCards[card.cardId] = card;
    }

    this.storage.set('favoriteCards', favoriteCards).then(() => {
      this._favoriteCardsSubject.next(favoriteCards);
    });
  }
}