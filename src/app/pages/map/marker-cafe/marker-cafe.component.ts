import { Component, OnInit } from '@angular/core';
import {RouteParamService} from "../../../shared/services/route-param.service";

@Component({
  selector: 'app-marker-cafe',
  templateUrl: './marker-cafe.component.html',
  styleUrls: ['./marker-cafe.component.scss'],
})
export class MarkerCafeComponent implements OnInit {
  constructor(
      private routeParamService: RouteParamService,
  ) {

  }



    ngOnInit() {
    }
}
