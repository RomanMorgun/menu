import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private cafeId: number;
  public cafeName: string;

  private previousUrl: string;
  private currentUrl: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

  }

  getRouterParams() {
    this.cafeId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.cafeName = this.activatedRoute.snapshot.paramMap.get('name');
  }

}
