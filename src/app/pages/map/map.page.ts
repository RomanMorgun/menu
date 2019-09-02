import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap, GoogleMaps, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
declare let H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {

  @ViewChild('map') mapElement: ElementRef;


  map: GoogleMap;
  private lat = 49.5862562;
  private lng = 34.5471086;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }
  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);
    const marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }






}
