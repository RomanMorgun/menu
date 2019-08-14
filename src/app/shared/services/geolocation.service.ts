import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable()
export class GeolocationService {

  constructor(private geolocation: Geolocation) {}

  public currentGeolocation = {
    lat: null,
    lng: null
  };

  getPosition() {
    this.geolocation.getCurrentPosition().then( (result) => {
      // console.log(result);
      const geoResult = result;
      // this.currentGeolocation = result.coords;
      this.currentGeolocation.lat = geoResult.coords.latitude;
      this.currentGeolocation.lng = geoResult.coords.longitude;
      console.log(this.currentGeolocation);
    });
  }


}
