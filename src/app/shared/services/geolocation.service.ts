import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps';
import {Geocoder, GeocoderRequest, GeocoderResult} from '@ionic-native/google-maps';

@Injectable()
export class GeolocationService {


    constructor(private geolocation: Geolocation) {
    }

    public currentGeolocation = {
        lat: null,
        lng: null
    };

    getPosition(): Promise<object> {
        return new Promise((resolve) => {
            if (this.currentGeolocation) {
                resolve(this.currentGeolocation);
            } else {
                this.geolocation.getCurrentPosition().then((result) => {
                    const geoResult = result;
                    this.currentGeolocation.lat = geoResult.coords.latitude;
                    this.currentGeolocation.lng = geoResult.coords.longitude;
                    console.log(this.currentGeolocation);
                    resolve(this.currentGeolocation);
                }).catch((error) => {
                    console.warn(error);
                });
            }
        });
    }

    getAddressLoc(locAddress: string): Promise<any> {
        const searchObj = {
            address: locAddress
        };
        return Geocoder.geocode({...searchObj});
    }
}
