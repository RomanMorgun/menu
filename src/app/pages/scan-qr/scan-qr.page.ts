import { Component, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from '@ionic-native/barcode-scanner/ngx';
import {Router} from '@angular/router';
import {QrService} from '../../shared/services/qr.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner,
              private  rt: Router,
              private qr: QrService) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }
  scannedData: string;
  barcodeScannerOptions: BarcodeScannerOptions;



  ngOnInit() {
    this.scanCode();
  }

  scanCode() {
    this.barcodeScanner
        .scan()
        .then(barcodeData => {
          this.scannedData = barcodeData.text;
          this.qr.saveId(this.scannedData);
          console.log(barcodeData);
          this.rt.navigate(['/selectAction']);
        })
        .catch(err => {
          console.log('Error', err);
          this.rt.navigate(['/selectAction']);
        });
  }
}
