import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrService {
 private idTable: string;
  constructor() { }

  saveId(id: string) {
    this.idTable = id;
    console.log(this.idTable);
  }

}
