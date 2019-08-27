import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {Menu2Page} from './menu2.page';

import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: Menu2Page
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [
        Menu2Page
    ],
    exports: [
        Menu2Page
    ]
})
export class Menu2PageModule {
}
