import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { HomePage } from './home.page';
// CommonModule,
@NgModule({
  declarations: [HomePage],
  imports: [

    SharedModule,

    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),

  ]
})
export class HomePageModule {}
