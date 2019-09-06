import { Component, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from '@ionic-native/barcode-scanner/ngx';
import {Router} from '@angular/router';
@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner,
              private  rt: Router) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;



  ngOnInit() {
    this.scanCode();
  }
  returnOnChoose() {
    this.rt.navigate(['/map']);
  }

  scanCode() {
    this.barcodeScanner
        .scan()
        .then(barcodeData => {
          alert('Barcode data ' + JSON.stringify(barcodeData));
          this.scannedData = barcodeData;
          this.returnOnChoose();
        })
        .catch(err => {
          console.log('Error', err);
        });
  }
}
