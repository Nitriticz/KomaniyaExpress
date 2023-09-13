import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'paquetes',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/paquetes/paquetes.module').then( m => m.PaquetesPageModule)
      },
      {
        path: ':idPaquete',
        loadChildren: () => import('./pages/paquetes-detail/paquetes-detail.module').then( m => m.PaquetesDetailPageModule)
      },
    ]
    
  },
  {
    path: 'repartidores',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/repartidores/repartidores.module').then( m => m.RepartidoresPageModule)
      },
      {
        path: ':idRepartidor',
        loadChildren: () => import('./pages/repartidores-detail/repartidores-detail.module').then( m => m.RepartidoresDetailPageModule)
      }
    ]
    
  },
  {
    path: 'new-paquete',
    loadChildren: () => import('./pages/new-paquete/new-paquete.module').then( m => m.NewPaquetePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
