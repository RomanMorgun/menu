import {Component, NgZone, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
} from '@ionic-native/google-maps/ngx';
import {ModalController, Platform} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

import {CafeService} from '../../shared/services/cafe.service';
import {
  customModalEnter,
  myLeaveAnimation
} from '../../animations/customAlertEnter';
import {ModalComponent} from './modal/modal.component';
import {Router} from '@angular/router';
import {GeolocationService} from '../../shared/services/geolocation.service';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {

  public previousUrl: string;
  private currentUrl: string;
  cafeCoordinate: object;

  // location: any;
  autoComplete: any;
  map: GoogleMap;
  markersOptions = [];
  markers = [];
  cafe: object;
  coordinateHist: any;

  // map drag event id
  dragMapEvent;
  searchbar: any;
  autocompleteItems = [];

  @ViewChild('googleSearch') public googleSearch: ElementRef;

  constructor(private activeRoute: ActivatedRoute,
              private geoLocService: GeolocationService,
              public platform: Platform,
              public cafeService: CafeService,
              private router: Router,
              private ngZone: NgZone,
              public modalController: ModalController,) {
  }

  ngOnInit() {
    this.checkParams();
  }

//   this.currentUrl = this.router.url;
//   this.router.events.subscribe(event => {
//   if (event instanceof NavigationEnd) {
//   this.previousUrl = this.currentUrl;
//   this.currentUrl = event.url;
// }
// // console.log(this.previousUrl);
// });
// if (this.previousUrl) {
//   this.previousUrl = this.previousUrl.substring(1);
// }


  checkParams() {
    this.activeRoute.params.subscribe((res) => {
      console.log(res);
      if (res) {
        this.cafeCoordinate = res;
        // TODO get one cafe marker
      }
    }, (err) => {
      console.log(err);
      // TODO get current Coords and get Cafes
    });
  }

  ionViewWillEnter() {
    // init map
    this.platform.ready()
      .then(() => {
        this.autoComplete = new google.maps.places.AutocompleteService();
        this.loadMap();
      });
  }

  updateSearchResults(ev): void {
    const inputValue = ev.target.value;
    if (inputValue === '') {
      this.autocompleteItems = [];
      console.log(this.autocompleteItems);
      return;
    } else {
      this.autoComplete.getPlacePredictions({input: inputValue}, (predications, status) => {
        this.autocompleteItems = [];
        // this.ngZone.run(() => {
        Array.isArray(predications) && predications.forEach((pred) => {
          this.autocompleteItems.push(pred);
        });
      }, (err) => {
        console.log(err);
      });
    }
  }

  selectSearchResult(item): void {
    this.geoLocService.getAddressLoc(item.description).then((res) => {
      console.log(res);
      if (res.length > 0) {
        this.cameraPosition(res[0].position, false);
      }
    });
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    this.map.addEventListenerOnce(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // bind handler to camera movements
        if (!this.dragMapEvent) {
        //   this.dragMapEvent = this.map.addEventListener(GoogleMapsEvent.MAP_DRAG_END)
        //     .subscribe((data) => {
        //       console.log(data);
        //       console.log(this.map.getCameraZoom());
        //       console.log(this.map.getCameraPosition().target);
        //       // and load new markers
        //       // this.loadEvents();
        //     });
        }
        if (this.cafeCoordinate) {
          this.cameraPosition(this.cafeCoordinate);
        } else if (this.coordinateHist) {
          // this.cameraPosition(this.coordinateHist);
        } else if (this.geoLocService.getCurrentPos().lat) {
          this.cameraPosition(this.geoLocService.getCurrentPos());
          // find out the current location device position
        } else {
          this.geoLocService.getPosition().then((res) => {
            this.cameraPosition(res);
          });
        }
      });
  }


  getCafes(coords: object = {}): void {
    this.clearGoogleMap();

    this.cafeService.getAllCafes(coords)
      .subscribe((res) => {
        console.log(res);
        // prepare events for rendering
        this.setMarkersOptions(res.data);
        // render events
        this.displayMarkers(this.markersOptions);
      });
  }

  getCafeByCoords(coordinates) {
    console.log(coordinates);
    this.cafeService.getCafesByCoords(coordinates).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }



  // group cafe into markers by location
  setMarkersOptions(events) {
    // process each event from an array
    eventsLoop: for (const event of events) {
      // if array is not empty
      if (this.markersOptions.length !== 0) {
        // compare location of every existed marker with location of current event
        for (const marker of this.markersOptions) {
          // if a marker with such a location exists
          if (marker.position.lat === event.latitude && marker.position.lng === event.longitude) {
            // add the current event data to it
            marker.events.push(event);
            continue eventsLoop;
          }
        }
        // if no marker with such location, create it
        this.createMarkerOption(event);
      } else {
        // if array is empty create first marker with current event
        this.createMarkerOption(event);
      }
    }
  }

  createMarkerOption(event): void {
    console.log(event);
    // create option for marker with current event
    this.markersOptions.push({
      title: event.name,
      // snippet:'number of events',
      events: [event],
      position: {
        lat: event.position[0],
        lng: event.position[1],
      },
      icon: {
        url: 'assets/icon/Coffee_10.png',
        size: {
          width: 32,
          height: 32
        }
      },
      snippet: String(event.id),
      disableAutoPan: false
    });
  }

  displayMarkers(markers): void {
    // take every marker options in array
    Array.isArray(markers) &&  markers.forEach((markerOptions) => {
      // and create google marker
      const curMarker: Marker = this.map.addMarkerSync(markerOptions);
      this.markers.push(curMarker);
      // add event listener for created marker
      curMarker.on(GoogleMapsEvent.MARKER_CLICK)
        .subscribe((data) => {
          console.log(curMarker.getSnippet());
          this.cafeService.getOneCafe(curMarker.getSnippet()).subscribe((res) => {
            this.cafe = res.data;
            console.log(this.cafe);
            this.cameraPosition(curMarker.getPosition());
            this.openModal();
            // this.coordinateHist = curMarker.getPosition();
          });
        });
    });
  }

  cameraPosition(latLng: object, markerOpt: boolean = true): void {
    console.log(markerOpt);
    console.log(latLng);
    // create option for camera movement
    let options = {};
    if (markerOpt) {
      options = {
        icon: {
          url: '/assets/icon/Coffee_5.png', size: {
            width: 35,
            height: 40
          }
        },
        target: latLng,
        zoom: 14,
        duration: 2000
      };

    } else {
      options = {
        target: latLng,
        zoom: 14,
        duration: 2000
      };
    }
    this.map.animateCamera(options)
      .finally(() => {
        if (markerOpt) {
          // this.getCafes();
        }
        // then load and display events in the current line of sight
      });
  }

  searchByMap() {
    console.log('test');
    const cameraPos = this.map.getCameraPosition();
    this.getCafeByCoords(cameraPos);
  }

  clearGoogleMap(): void {
    // remove every marker
    this.markers.map((marker) => {
      marker.remove();
    });
    this.markers.length = 0;
    this.markersOptions.length = 0;
  }

  async openModal(): Promise<any> {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: ModalComponent,
        componentProps: {cafe: this.cafe},
        enterAnimation: customModalEnter,
        leaveAnimation: myLeaveAnimation,
      });
    console.log(this.cafe);
    await modal.present();
  }

  dismModal(): void {
    this.modalController.dismiss({
      component: ModalComponent,
      leaveAnimation: myLeaveAnimation,
    });
  }

  clearSearchArr(ev) {
    this.autocompleteItems = [];
  }

  ngOnDestroy() {
    delete this.dragMapEvent;
    this.map.remove().finally();
  }


}


