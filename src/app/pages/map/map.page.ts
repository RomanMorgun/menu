import {Component, Input, NgZone, OnInit} from '@angular/core';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    MarkerIcon, Geocoder, GeocoderResult
} from '@ionic-native/google-maps/ngx';
import { ModalController, Platform} from '@ionic/angular';

import {RouteParamService} from '../../shared/services/route-param.service';
import {CustomGeoCoordinateService} from './custom-geo-coordinate.service';
import {CafeService} from '../../shared/services/cafe.service';
import {
    customModalEnter,
    myLeaveAnimation
} from '../../animations/customAlertEnter';
import {ModalComponent} from './modal/modal.component';
import {NavigationEnd, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MapsAPILoader} from "@agm/core";




@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    cafeCoordinate: any;
    map: GoogleMap;
    markersOptions = [];
    markers = [];
    cafe: any;
    coordinateHist: any;
    public previousUrl: string;
    private currentUrl: string;
    // map drag event id
    dragMapEvent;
    searchbar: any;

    constructor(
        private geoPosition: CustomGeoCoordinateService,
        private formBuilder: FormBuilder,
        public platform: Platform,
        public requestCafe: CafeService,
        private router: Router,
        public modalController: ModalController,
        private mapsAPILoader: MapsAPILoader
    ) {
        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            }
            console.log(this.previousUrl);
        });
        if (this.previousUrl) {
            this.previousUrl = this.previousUrl.substring(1);
        }

    }

    ngOnInit() {
        // this.generateForm();

    }

    // generateForm() {
    //     this.cityForm = this.formBuilder.group({
    //         cityName: ['', Validators.compose([
    //             Validators.required,
    //             Validators.maxLength(20), Validators.minLength(4), Validators.pattern('^[A-Za-zА-Яа-яЁёіІїЇєЄ\\s]+$')
    //         ])]
    //     });
    // }
    //
    // checkValidation() {
    //     console.log(this.cityForm.valid);
    // }
    //
    // findCity() {
    //     console.log('1');
    // }
    ionViewWillEnter() {

        // init map
        this.platform.ready()
            .then(() => {
                this.cafeCoordinate = JSON.parse(sessionStorage.getItem('geo'));
                console.log(this.cafeCoordinate);
                sessionStorage.clear();
                this.loadMap();
            });
    }

    ionViewDidLeave() {
        // set to null variable with event listener
        this.dragMapEvent = undefined;
        // this.routeParamService.markerEvents.next(undefined);
        this.map.remove().finally();
    }

    loadMap() {
       // this.coordinateHist = null;
        // initialize the map in the appropriate container
        this.map = GoogleMaps.create('map_canvas');
       // this.cafeCoordinate = this.routeParamService.position;
        console.log(this.cafeCoordinate);
        // wait for ready map
        this.map.addEventListenerOnce(GoogleMapsEvent.MAP_READY)
            .then(() => {
                // bind handler to camera movements
                if (!this.dragMapEvent) {
                    this.dragMapEvent = this.map.addEventListener(GoogleMapsEvent.MAP_DRAG_END)
                        .subscribe(() => {
                            // and load new markers
                            this.loadEvents();
                        });
                }

                if (this.cafeCoordinate) {
                    this.cameraPosition(this.cafeCoordinate);
                } else if (this.coordinateHist) {
                    this.cameraPosition(this.coordinateHist);
                } else {
                    // find out the current location device position
                    this.geoPosition.getMyGeoLocation()
                        .then((location) => {
                            // if the location is determined, the camera will move to it
                            this.cameraPosition(location);
                        })
                        .catch((msg) => {
                            // show warn message
                            alert(JSON.stringify(msg));
                        });
                }

            });
    }

    onButton() {

        // Address -> latitude,longitude
        Geocoder.geocode(
            {"address": this.searchbar}
        ).then((results: GeocoderResult[]) => {
            console.log(results);
// Add a marker
            let marker: Marker = this.map.addMarkerSync({
                'position': results[0].position,
                'title':  JSON.stringify(results[0].position)
            });

            // Move to the position
            this.map.animateCamera({
                'target': marker.getPosition(),
                'zoom': 17
            }).then(() => {
                marker.showInfoWindow();
            });
        });
    }
        //     // Add a marker
        //     let marker: Marker = this.map.addMarkerSync({
        //         'position': results[0].position,
        //         'title': JSON.stringify(results[0].position)
        //     });
        //
        //     // Move to the position
        //     this.map.animateCamera({
        //         'target': marker.getPosition(),
        //         'zoom': 17
        //     }).then(() => {
        //         marker.showInfoWindow();
        //     });
        //



        loadEvents() {
        // get border coordinates of current map window
        // let mapRange = this.map.getVisibleRegion();

        // create option-object with valid format of data with location value
        // let queryOptions = {
        //     'latitude_from': mapRange.southwest.lat,
        //     'latitude_to': mapRange.northeast.lat,
        //     'longitude_from': mapRange.southwest.lng,
        //     'longitude_to': mapRange.northeast.lng,
        // };

        // clear map
        this.clearGoogleMap();

        this.requestCafe.getAllCafes()
            .subscribe((res) => {
                console.log(res);
                // prepare events for rendering
                this.setMarkersOptions(res.data);
                // render events
                this.displayMarkers(this.markersOptions);
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

    createMarkerOption(event) {
        console.log(event);
        const iconCust: MarkerIcon = {
            url: '../../assets/icon/coffee-solid.svg',
            size: {
                width: 32,
                height: 24
            }
        };
        // create option for marker with current event
        this.markersOptions.push({
            title: event.name,
            // snippet:'number of events',
            events: [event],
            position: {
                lat: event.position[0],
                lng: event.position[1],
            },
            icon:  {
                url: 'assets/icon/Coffee_10.png',
                size: {
                    width: 32,
                    height: 32
                }
        },
            snippet: String(event.id) ,
            disableAutoPan: false
        });
    }

    displayMarkers(markers) {
        // take every marker options in array
        markers.forEach((markerOptions) => {
            // and create google marker
            const curMarker: Marker = this.map.addMarkerSync(markerOptions);
            this.markers.push(curMarker);
            // add event listener for created marker
            curMarker.on(GoogleMapsEvent.MARKER_CLICK, )
                .subscribe((data) => {
                    console.log('1');
                    console.log(curMarker.getSnippet());
                    this.requestCafe.getOneCafe(curMarker.getSnippet()).subscribe((res) => {
                            this.cafe = res.data;
                            console.log(this.cafe);
                            this.cameraPosition(curMarker.getPosition());
                            this.openModal();
                            this.coordinateHist = curMarker.getPosition();
                            sessionStorage.setItem('geoHist', JSON.stringify(this.coordinateHist));
                    });
                    // this.zone.run(() => {
                    //     console.log('2');
                    //     // if user click on marker info window will appear
                    //    // this.routeParamService.markerEvents.next(data[1].get('events'));
                    // });
                });
        });
    }

    cameraPosition(latLng) {
        // create option for camera movement
        const options = {
            icon: {url: '/assets/icon/Coffee_5.png',  size: {
                    width: 35,
                    height: 40
                }},
            target: latLng,
            zoom: 16,
            duration: 1000
        };
        // move camera to needed point
        this.map.animateCamera(options)
            .finally(() => {
                // then load and display events in the current line of sight
                this.loadEvents();
            });
    }

    clearGoogleMap() {
        // remove every marker
        this.markers.map((marker) => {
            marker.remove();
        });
        // clear arrays with markers and markers data
        this.markers.length = 0;
        this.markersOptions.length = 0;
    }

    async openModal() {
        console.log('21');
        const modal: HTMLIonModalElement =
            await this.modalController.create({
                component: ModalComponent,
                componentProps: {cafe: this.cafe},
                enterAnimation: customModalEnter,
                leaveAnimation: myLeaveAnimation,
            });
        console.log('22');
        console.log(this.cafe);
        await modal.present();
    }


     dismModal() {
                console.log('23');
                this.modalController.dismiss({
                component: ModalComponent,
                leaveAnimation: myLeaveAnimation,
            });
    }


}


