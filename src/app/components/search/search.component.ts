import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }
  // Emitter => Directiva para emitir eventos personalizados. En este caso, emito 
  ngOnInit(): void {
    this.search.valueChanges
      .subscribe(value => this.searchEmitter.emit(value));
  }

  search = new FormControl('');

  @Output('search') searchEmitter = new EventEmitter<string>();

  public cleanSearch() {
    this.search.setValue("");
  }
}
