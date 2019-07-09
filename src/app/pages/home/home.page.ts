import { Component, OnInit } from '@angular/core';
import { Cafe } from '../../shared/models/cafe.model';
import { CafeService } from '../../shared/services/cafe.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements  OnInit {
  public appName = 'AppName';
  public cafes: Cafe[];
  private cafesCopy: Cafe[];
  public cafesSearch: Cafe[];

  constructor(private cafeService: CafeService) {}

  ngOnInit() {
    this.getCafes();
  }

  getCafes() {
    this.cafes = this.cafeService.getCafes();
    this.cafesCopy = JSON.parse(JSON.stringify(this.cafes));


  }

  copyForSearch() {
    this.cafes = JSON.parse(JSON.stringify(this.cafesCopy));
    // this.cafesSearch = JSON.parse(JSON.stringify(this.cafes));
  }

  searchCafe(searchValue: string) {
    this.copyForSearch();
    if (searchValue !== '') {
      this.cafes = this.cafes.filter(item => item.name.toLowerCase().indexOf(searchValue.toLowerCase())  > -1 );
    } else {
      this.copyForSearch();
    }
  }

}
