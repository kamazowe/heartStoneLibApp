import { Component } from '@angular/core';
import { CardService } from '../shared/card.service';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../shared/card.model';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage {

  cardId: string;
  card: Card;

  constructor(private activatedRoute: ActivatedRoute,
              private cardService: CardService) {
  }

  ionViewWillEnter(): void {
    this.cardId = this.activatedRoute.snapshot.paramMap.get('cardId');
    this.cardService.getCardById(this.cardId).subscribe((card: Card) => {
      this.card = card;
    });
  }

  updateImage(event: Event) {
    // fixme
    // this.card.img = 'assets/images/DefaultCard.png';
  }
}
