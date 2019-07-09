import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MenuPage} from './pages/menu/menu.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  {path: 'menu', component: MenuPage},
  { path: 'basket', loadChildren: './pages/basket/basket.module#BasketPageModule' },
  { path: 'scan-qr', loadChildren: './pages/scan-qr/scan-qr.module#ScanQrPageModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
// { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },

