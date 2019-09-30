import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScanQrPage } from './scan-qr.page';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

const routes: Routes = [
  {
    path: '',
    component: ScanQrPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScanQrPage],
  providers: [ BarcodeScanner ]
})
export class ScanQrPageModule {}
