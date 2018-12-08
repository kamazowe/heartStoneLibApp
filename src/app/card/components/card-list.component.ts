import { Component, Input } from '@angular/core';
import { CardDeck } from '../shared/card.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: 'card-list.component.html',
})
export class CardListComponent {
  @Input() items: any[] = [];
  @Input() listName: string;
  @Input() navigateTo: any;

}
