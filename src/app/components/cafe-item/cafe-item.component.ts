import { Component, OnInit, Input } from '@angular/core';
import { Cafe } from '../../shared/models/cafe.model';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cafe-item',
  templateUrl: './cafe-item.component.html',
  styleUrls: ['./cafe-item.component.scss'],
})
export class CafeItemComponent implements OnInit {
  @Input() cafe: Cafe;
  @Input() currentDay: number;
  public currentWorkTime: string;


  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.cafe);
    console.log(this.currentDay);
    // this.getCurrentDay();s
  }

  getCurrentWorkTime() {
    return this.cafe.workTime[this.currentDay - 1];
  }


  selectCafe() {
    console.log(this.cafe.menuId);
    this.router.navigate(['menu',  {id: this.cafe.menuId, name: this.cafe.name, cafeId: this.cafe.id}]);
  }

}
