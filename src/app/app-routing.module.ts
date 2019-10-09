import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MenuPage} from './pages/menu/menu.page';
import {ChooseActionPage} from './pages/choose-action/choose-action.page';
import {ScanQrPage} from './pages/scan-qr/scan-qr.page';
import { HistoryPage } from './pages/history/history.page';

const routes: Routes = [
    {path: '', redirectTo: 'selectAction', pathMatch: 'full'},
    {path: 'selectAction', component: ChooseActionPage},
    {path: 'scan-qr', component: ScanQrPage},
    {path: 'menu', component: MenuPage},
    {path: 'history', component: HistoryPage},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
    {path: 'basket', loadChildren: './pages/basket/basket.module#BasketPageModule'},
    {path: 'map', loadChildren: './pages/map/map.module#MapPageModule'},


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
