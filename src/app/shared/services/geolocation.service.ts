import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Geocoder, GeocoderRequest, GeocoderResult} from '@ionic-native/google-maps';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    constructor(private geolocation: Geolocation) {
    }

    public _currentGeolocation = {
        lat: null,
        lng: null
    };

    setCurrentPos(lat, lng) {
        window.localStorage.setItem('lat', lat);
        window.localStorage.setItem('lng', lng);
        this._currentGeolocation.lat = lat;
        this._currentGeolocation.lng = lng;
    }

    getCurrentPos() {
        const lat = window.localStorage.getItem('lat');
        const lng = window.localStorage.getItem('lng');
        if (lat && lng && !this._currentGeolocation.lat) {
            this.setCurrentPos(lat, lng);
        }
        return this._currentGeolocation;
    }

    getPosition(): Promise<object> {
        return new Promise((resolve) => {
            if (this._currentGeolocation.lat &&
                this._currentGeolocation.lng) {
                resolve(this.getCurrentPos());
            } else {
                this.geolocation.getCurrentPosition().then((result) => {
                    this.setCurrentPos(result.coords.latitude, result.coords.longitude);
                    console.log('current position', this.getCurrentPos());
                    resolve(this.getCurrentPos());
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
