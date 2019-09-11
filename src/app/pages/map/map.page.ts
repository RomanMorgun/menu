import {Component, Input, NgZone, OnInit} from '@angular/core';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Environment, MarkerIcon
} from '@ionic-native/google-maps/ngx';
import {Platform} from '@ionic/angular';
import {GeolocationService} from '../../shared/services/geolocation.service';
import {RouteParamService} from "../../shared/services/route-param.service";
import {CustomGeoCoordinateService} from "./custom-geo-coordinate.service";
import {CafeService} from "../../shared/services/cafe.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    @Input() position: object;
  map: GoogleMap;
  markersOptions = [];
  markers = [];
  dragMapEvent;
  cafeCoordinate: any;
  cityCoordinate: any;
  constructor(
               public platform: Platform,
               public zone: NgZone,
               public routeParamService: RouteParamService,
               public geo: GeolocationService,
               private geoPosition: CustomGeoCoordinateService,
               public cafeInfoServ: CafeService,

              ) {
      console.log(this.routeParamService.cafeCoordinate);
  }

  ngOnInit() {

  }
  ionViewWillEnter() {

    // init map
    this.platform.ready()
        .then(() => {
            this.cafeCoordinate = JSON.parse(sessionStorage.getItem('geo'));
            sessionStorage.clear();
          this.loadMap();
        });
  }
  getCoordinate() {
      this.geo.getPosition();

  }
  ionViewDidLeave() {
    // set to null variable with event listener
    this.dragMapEvent = undefined;
    // this.routeParamService.markerEvents.next(undefined);
    this.map.remove().finally();
      sessionStorage.clear();
  }

  loadMap() {
      let icon: MarkerIcon = {
          url: "../../assets/icon/coffee-solid.svg",
          size: {
              width: 35,
              height: 40
          }
      };




      Environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDGNinnVlrH3QrIyL5Abo2Z42aDJ4KLW3c',
          API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDGNinnVlrH3QrIyL5Abo2Z42aDJ4KLW3c'
      });
    // initialize the map in the appropriate container
      let mapOptions: GoogleMapOptions = {
          backgroundColor: 'white',
          controls: {
              compass: true,
              myLocationButton: true,
              indoorPicker: true,
              zoom: true
          },
          gestures: {
              scroll: true,
              tilt: true,
              rotate: true,
              zoom: true
          },
          camera: {
              target: this.cafeCoordinate,
              tilt: 30,
              zoom: 15,
              bearing: 50
          }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      let marker: Marker = this.map.addMarkerSync({
          title: 'Ionic',
          icon: icon,
          animation: 'DROP',
          position: this.cafeCoordinate,
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      });

      this.map.addEventListenerOnce(GoogleMapsEvent.MAP_READY)
          .then(() => {
              // bind handler to camera movements
              if (this.dragMapEvent) {
                  this.dragMapEvent = this.map.addEventListener(GoogleMapsEvent.MAP_DRAG_END)
                      .subscribe(() => {
                          // and load new markers
                          this.loadCafe();
                      });
              }

              if (this.cityCoordinate){
                  this.cameraPosition(this.cityCoordinate);
                  // this.routeParamService.position = null;
              } else {
                  // find out the current location device position
                  this.geoPosition.getMyGeoLocation()
                      .then((location) => {
                          // if the location is determined, the camera will move to it
                          this.cameraPosition(location)
                      })
                      .catch((msg) => {
                          // show warn message
                          alert(JSON.stringify(msg));
                      })
              }

          });
  }

    loadCafe(){
        // get border coordinates of current map window
        let mapRange = this.map.getVisibleRegion();

        // create option-object with valid format of data with location value
        let queryOptions = {
            'latitude_from': mapRange.southwest.lat,
            'latitude_to': mapRange.northeast.lat,
            'longitude_from': mapRange.southwest.lng,
            'longitude_to': mapRange.northeast.lng,
        };

        //clear map
        this.clearGoogleMap();

        // query for cafes with current options
        this.cafeInfoServ.getAllCafes()
            .subscribe((res) => {
                // prepare cafe for rendering
                this.setMarkersOptions(res.data);

                // render cafe
                this.displayMarkers(this.markersOptions);


            });

    }

    //group events into markers by location
    setMarkersOptions(cafes){
        // process each event from an array
        eventsLoop:for (let cafe of cafes){
            // if array is not empty
            if (this.markersOptions.length !== 0) {
                // compare location of every existed marker with location of current cafe
                for (let marker of this.markersOptions) {
                    // if a marker with such a location exists
                    if (marker.position.lat == cafe.latitude && marker.position.lng == cafe.longitude) {
                        // add the current cafe data to it
                        marker.cafes.push(cafe);
                        continue eventsLoop;
                    }
                }
                // if no marker with such location, create it
                this.createMarkerOption(cafe);
            } else {
                // if array is empty create first marker with current event
                this.createMarkerOption(cafe);
            }
        }
    }

    createMarkerOption(cafe){
        let icon: MarkerIcon = {
            url: "../../assets/icon/Coffee_10.png",
            size: {
                width: 35,
                height: 40
            }
        };
        // create option for marker with current cafe
        this.markersOptions.push({
            title:cafe.name,
            // snippet:'number of events',
            position: {
                lat: cafe.position[0],
                lng: cafe.position[1]
            },
            animation: 'BOUNCE',
            icon: icon,
            disableAutoPan: true
        });

    }

    displayMarkers(markers){
        // take every marker options in array
        markers.forEach((markerOptions) => {
            // and create google marker
            let marker: Marker = this.map.addMarkerSync(markerOptions);
            this.markers.push(marker);

            // add cafe listener for created marker
            marker.on(GoogleMapsEvent.MARKER_CLICK)
                    .subscribe(() => {
                       this.cameraPosition(marker.getPosition());

                })
        });
    }

    cameraPosition(latLng) {
        // create option for camera movement
        let options = {
            target: latLng,
            zoom: 18,
            duration: 2000
        };
        // move camera to needed point
        this.map.animateCamera(options)
            .finally(() => {
                // then load and display events in the current line of sight
                this.loadCafe();
                this.cafeCoordinate = null;
            });
    }

    clearGoogleMap(){
        //remove every marker
        this.markers.map((marker)=> {
            marker.remove();
        });
        // clear arrays with markers and markers data
        this.markers.length = 0;
        this.markersOptions.length = 0;
    }




}


