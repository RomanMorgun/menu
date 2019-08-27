import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MenuPage} from './pages/menu/menu.page';
import {ChooseActionPage} from './pages/choose-action/choose-action.page';
import {Menu2Page} from './pages/menu2/menu2.page';

const routes: Routes = [
    {path: '', redirectTo: 'selectAction', pathMatch: 'full'},
    {path: 'selectAction', component: ChooseActionPage},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
    {path: 'menu', component: MenuPage},
    {path: 'menu2', loadChildren: './pages/menu2/menu2.module#Menu2PageModule'},
    {path: 'basket', loadChildren: './pages/basket/basket.module#BasketPageModule'},
    {path: 'scan-qr', loadChildren: './pages/scan-qr/scan-qr.module#ScanQrPageModule'},
    {path: 'map', loadChildren: './pages/map/map.module#MapPageModule'},
    {path: 'history', loadChildren: './pages/history/history.module#HistoryPageModule'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

// { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
// { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },

