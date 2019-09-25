import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Cafe } from '../../shared/models/cafe.model';
import { Router } from '@angular/router';

import {RouteParamService} from "../../shared/services/route-param.service";




@Component({
  selector: 'app-cafe-item',
  templateUrl: './cafe-item.component.html',
  styleUrls: ['./cafe-item.component.scss'],
})
export class CafeItemComponent implements OnInit {
  @Input() cafe: Cafe;
  @Input() currentDay: number;
  @Input() phone: number;
  public workTime: any;
  public coordinate: object;
  constructor(private router: Router,
              private routeParamService: RouteParamService,
 ) { }

  ngOnInit() {
    console.log(this.cafe);
    console.log(this.currentDay);
    this.workTime = this.cafe.workTime;
    // this.getCurrentDay();s
  }


  selectCafe() {
    this.router.navigate(['menu', {id: this.cafe.menuId, name: this.cafe.name}]);
  }

  geoCafe() {

    this.router.navigate(['map']);

  }

}
