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

  private cityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private geolocationService: GeolocationService,
    private rt: Router) {}

  ngOnInit() {
    this.generateForm();
    this.getGeoLocation();
  }

  getGeoLocation() {
    this.geolocationService.getPosition();
  }

  generateForm() {
    this.cityForm = this.formBuilder.group({
      cityName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20), Validators.minLength(4), Validators.pattern('^[A-Za-zА-Яа-яЁёіІїЇєЄ\\s]+$')
      ])]
    });
  }

  findCity() {
    this.rt.navigate(['/map']);
  }

  checkValidation() {
    console.log(this.cityForm.valid);
  }
}
