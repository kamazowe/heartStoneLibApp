import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';
import { Card } from '../shared/card.model';
import { LoaderService } from '../../shared/loader.service';
import { ToastService } from '../../shared/toast.service';
import { FavoriteCardStore } from '../../shared/favorite-card.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

  cardDeckGroup: string;
  cardDeck: string;
  cards: Card[] = [];
  copyOfCards: Card[] = [];

  favoriteCards;
  isLoading = false;
  getCardsSubscription: Subscription;
  favoriteCardsSubscription: Subscription;

  constructor(private cardService: CardService,
              private activatedRoute: ActivatedRoute,
              private loaderService: LoaderService,
              private toastService: ToastService,
              private favoriteCardStore: FavoriteCardStore) {
    this.favoriteCardsSubscription = this.favoriteCardStore.favoriteCards$.subscribe((favoriteCards: any) => {
      this.favoriteCards = favoriteCards;
    });
  }


  ionViewWillEnter() {
    this.cardDeckGroup = this.activatedRoute.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.activatedRoute.snapshot.paramMap.get('cardDeck');
    this.getCards();
  }

  doRefresh(event) {
    this.getCards();
    event.target.complete();
  }

  hydrateCards(cards: Card[]) {
    this.cards = cards;
    this.isLoading = false;
  }

  toggleFavoriteCard(card: Card): void {
    this.favoriteCardStore.toggleCard(card);
  }

  private isCardFavorite(cardId: string): boolean {
    const card = this.favoriteCards[cardId];
    return card ? true : false;
  }

  private getCards() {
    this.loaderService.presentLoading();

    this.getCardsSubscription = this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck)
        .subscribe((cards: Card[]) => {
          this.cards = cards.map((card: Card) => {
            card.text = this.cardService.replaceCardTextLine(card.text);
            card.favorite = this.isCardFavorite(card.cardId);
            return card;
          });
          this.copyOfCards = Array.from(this.cards);
          this.loaderService.dismissLoading();
        }, () => {
          this.loaderService.dismissLoading();
          this.toastService.presentErrorToast('Uuup card could not be loaded , lets let try to refresh page');
        });
  }

  private ionViewDidLeave() {
    this.getCardsSubscription.unsubscribe();
    if (this.favoriteCardsSubscription && !this.favoriteCardsSubscription.closed) {
      this.favoriteCardsSubscription.unsubscribe();
    }
  }

  handleSearch() {
    this.isLoading = true;
  }
}
