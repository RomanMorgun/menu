import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() name: string;
  @Output() searchValue = new EventEmitter<string>();

  public nameHide = false;

  constructor() { }

  ngOnInit() {}

  searchClick() {
    this.nameHide === false ? this.nameHide = true : this.nameHide = false;
    console.log('search CLICK');
  }

  locationClick() {
    console.log('location CLICK');
  }

  cartClick() {
    console.log('cart CLICK');
  }

  searchCafe(event) {
    const searchValue = event.target.value;
    this.searchValue.emit(searchValue);
  }

  clearClick(event) {
    event.target.value = '';
    this.searchCafe(event);
  }

}
