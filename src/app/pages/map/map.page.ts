import {Component, NgZone, OnInit} from '@angular/core';
import { GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Environment} from '@ionic-native/google-maps/ngx';
import {Platform} from '@ionic/angular';
import {GeolocationService} from '../../shared/services/geolocation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: GoogleMap;
  markersOptions = [];
  markers = [];
  dragMapEvent;
  constructor(
               public platform: Platform,
               public zone: NgZone,
               public geo: GeolocationService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {

    // init map
    this.platform.ready()
        .then(() => {
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
  }

  loadMap() {
      Environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDGNinnVlrH3QrIyL5Abo2Z42aDJ4KLW3c',
          API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDGNinnVlrH3QrIyL5Abo2Z42aDJ4KLW3c'
      });
    // initialize the map in the appropriate container
      let mapOptions: GoogleMapOptions = {
          camera: {
              target: {
                  lat: 43.0741904,
                  lng: -89.3809802
              },
              zoom: 18,
              tilt: 30
          }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      let marker: Marker = this.map.addMarkerSync({
          title: 'Ionic',
          icon: './assets/Coffee_1.png',
          animation: 'DROP',
          position: {
              lat: 43.0741904,
              lng: -89.3809802
          }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          alert('Sity name');
      });
  }

  }

