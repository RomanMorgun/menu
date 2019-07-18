import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../../shared/models/dish.model';

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss'],
})
export class DishItemComponent implements OnInit {
  @Input() dish: Dish;

  constructor() { }

  public automaticClose = false;

  ngOnInit() {
    // this.info[0].open = true;
    // console.log(this.dish);
  }
  buyItem(test) {
    console.log(test);
  }



  toggleItem(index, childIndex) {
    // this.information[index].children[childIndex].open
  }

}
