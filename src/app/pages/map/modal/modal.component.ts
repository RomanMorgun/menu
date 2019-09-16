import {Component, Input, OnInit, SimpleChange} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {Cafe} from "../../../shared/models/cafe.model";
import {Router} from "@angular/router";
import {CafeService} from "../../../shared/services/cafe.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
   @Input() cafe: object;
  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private router: Router,
              private cafeServ: CafeService) {

  }
  //   ngOnChanges(changes: { [property: string]: SimpleChange }){
  //       // Extract changes to the input property by its name
  //       let change: SimpleChange = changes['cafe'];
  //
  //   };
  //
  // ionViewWillEnter() {
  //     this.cafe = this.cafeServ.cafe;
  //
  // }

    // ionViewWillEnter() {
    //
    //     this.id = this.navParams.get('otherParameter');
    //     this.cafeServ.getOneCafe(this.id);
    //     this.cafe = this.cafeServ.cafe;
    // }

    navCafe(cafe) {
      // this.cafe = this.navParams.get('componentProps');
      this.router.navigate(['menu', {id: cafe.id, name: cafe.name}]);
      this.modalController.dismiss(cafe);
    }


  ngOnInit() {
  // this.cafe = this.cafeServ.cafe;

  }

}
