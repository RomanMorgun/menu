import {Injectable, NgZone} from '@angular/core';
import {Platform} from "@ionic/angular";
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {CafeService} from "../../shared/services/cafe.service";



@Injectable({
  providedIn: 'root'
})
export class CustomGeoCoordinateService {

  coordinate: object;

  constructor(public platform: Platform,
              public request: CafeService,
              public zone: NgZone,
              private geo: Geolocation) { }

  myLocation;
 geoCoordinate(lat, lng) {
   this.coordinate = {
     lat: lat,
     lng: lng
   }
 }
  getMyGeoLocation(): Promise<any> {
    return new Promise((resolve) => {

      let opt = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      if (this.myLocation){
        resolve(this.myLocation);
      } else {
        this.geo.getCurrentPosition(opt)
            .then((res)=>{
              this.myLocation = {
                lat: res.coords.latitude,
                lng: res.coords.longitude
              };
              resolve(this.myLocation);
            })
            .catch((err)=>{console.log(err)});
      }
    });
  }

}
