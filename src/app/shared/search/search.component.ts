import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {

  @Input() items: any[] = [];
  @Input() filteredProperty: string;

  @Output() searchCompleted = new EventEmitter();
  sub: any;

  private searchSubject = new BehaviorSubject<string>('');

  handleSearch(event): void {

    const searchedText = event.target.value;
    if (!this.items) {
      return this.searchCompleted.emit([]);
    }

    if (!searchedText) {
      return this.searchCompleted.emit(this.items);
    }

    const filteredItems = this.items.filter(item => item[this.filteredProperty].toLowerCase().includes(searchedText.toLowerCase()));

    this.searchCompleted.emit(filteredItems);
  }

  ionViewDidEnter() {

    this.sub = this.searchSubject.pipe(
        debounceTime(500),
        distinctUntilChanged(),
    ).subscribe(searchedText => {
      if (!this.items) {
        return this.searchCompleted.emit([]);
      }

      if (!searchedText) {
        return this.searchCompleted.emit(this.items);
      }

      const filteredItems = this.items.filter(item => item[this.filteredProperty].toLowerCase().includes(searchedText.toLowerCase()));

      this.searchCompleted.emit(filteredItems);

    });
  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }
}
