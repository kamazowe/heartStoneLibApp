import { Component } from '@angular/core';
import { FavoriteCardStore } from '../../shared/favorite-card.store';
import { Subscription } from 'rxjs';
import { Card } from '../shared/card.model';

@Component({
  selector: 'app-card-favorite',
  templateUrl: './card-favorite.page.html',
  styleUrls: ['./card-favorite.page.scss'],
})
export class CardFavoritePage {

  favoriteCardSubscription: Subscription;
  favoriteCards: Card[] = [];

  constructor(private favoriteCardStore: FavoriteCardStore) {

  }

  ionViewDidEnter(): void {
    this.favoriteCardSubscription = this.favoriteCardStore.favoriteCards$.subscribe((favoriteCards) => {
      this.favoriteCards = this.getFavoriteCardList(favoriteCards);
    });

  }

  ionViewDidLeave(): void {
    if (this.favoriteCardSubscription && !this.favoriteCardSubscription.closed) {
      this.favoriteCardSubscription.unsubscribe();
    }
  }

  private getFavoriteCardList(favoriteCards: any): Card[] {
    if (favoriteCards) {
      const obj = Object.keys(favoriteCards)
          .filter(key => favoriteCards[key])
          .map(key => favoriteCards[key]);
      return obj;
    }
    return [];
  }
}
