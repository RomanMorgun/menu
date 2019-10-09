import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Cafe } from '../../shared/models/cafe.model';
import { Router } from '@angular/router';

import { GeolocationService } from '../../shared/services/geolocation.service';
import {RouteParamService} from '../../shared/services/route-param.service';


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
              private geoLocService: GeolocationService,
              private routeParamService: RouteParamService,
 ) { }

  ngOnInit() {
    console.log(this.cafe);
    this.workTime = this.cafe.workTime;
    // this.getCurrentDay();
  }

  selectCafe() {
    this.router.navigate(['menu',  {id: this.cafe.menuId, name: this.cafe.name, cafeId: this.cafe.id}]);
  }

  geoCafe(cafePosition) {
      const coordObj = {
          lat: cafePosition[0],
          lng: cafePosition[1]
      };
      console.log(JSON.stringify(coordObj));
      this.router.navigate(['map', coordObj]);
  }
}
