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

  markerEvents;

  ngOnInit() {
    this.routeParamService.markerCafes
        .subscribe((events) => {
          this.markerEvents = events;
          if (events && events.length > 0){
            this.routeParamService.isCafeOnPage = true;
          }
        });
  }


  ngOnDestroy(){
    // this.routeParamService.isEventsOnPage = false;
  }
}
