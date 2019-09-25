import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GeolocationService } from '../../shared/services/geolocation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-choose-action',
  templateUrl: './choose-action.page.html',
  styleUrls: ['./choose-action.page.scss']
})

export class ChooseActionPage implements OnInit {
  constructor(
   ) {}

  ngOnInit() {
  }
}
