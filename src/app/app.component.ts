import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { GeolocationService } from './shared/services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private geolocation: GeolocationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.platform.backButton.subscribeWithPriority(9999, () => {
      //   console.log('adwad');
      // });
      this.geolocation.getPosition();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
