import { Component, OnInit, Input } from '@angular/core';
import { Cafe } from '../../shared/models/cafe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cafe-item',
  templateUrl: './cafe-item.component.html',
  styleUrls: ['./cafe-item.component.scss'],
})
export class CafeItemComponent implements OnInit {
  @Input() cafe: Cafe;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.cafe);
  }

  selectCafe() {
    this.router.navigate(['menu', {id: this.cafe.id, name: this.cafe.name}]);
  }

}
