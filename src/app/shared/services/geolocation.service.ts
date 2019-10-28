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
        console.log('created geolocation service');
    }

    public currentGeolocation = {
        lat: null,
        lng: null
    };

    setCurrentPos(lat, lng) {
        window.localStorage.setItem('lat', lat);
        window.localStorage.setItem('lng', lng);
        this.currentGeolocation.lat = lat;
        this.currentGeolocation.lng = lng;
    }

    getCurrentPos() {
        const lat = window.localStorage.getItem('lat');
        const lng = window.localStorage.getItem('lng');
        if (lat && lng) {
            this.setCurrentPos(lat, lng);
        }
        return this.currentGeolocation;
    }

    getPosition(): Promise<object> {
        return new Promise((resolve) => {
            if (this.currentGeolocation && this.currentGeolocation.lat && this.currentGeolocation.lng) {
                resolve(this.currentGeolocation);
            } else {
                this.geolocation.getCurrentPosition().then((result) => {
                    this.setCurrentPos(result.coords.latitude, result.coords.longitude);
                    console.log('current position', this.currentGeolocation);
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
