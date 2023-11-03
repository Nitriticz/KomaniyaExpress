import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

const unauthorized = () => redirectUnauthorizedTo(['']);
const logged = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    ...canActivate(unauthorized),
  },
  {
    path: 'paquetes',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/paquetes/paquetes.module').then(
            (m) => m.PaquetesPageModule
          ),
        ...canActivate(unauthorized),
      },
      {
        path: ':idPaquete',
        loadChildren: () =>
          import('./pages/paquetes-detail/paquetes-detail.module').then(
            (m) => m.PaquetesDetailPageModule
          ),
        ...canActivate(unauthorized),
      },
    ],
  },
  {
    path: 'repartidores',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/repartidores/repartidores.module').then(
            (m) => m.RepartidoresPageModule
          ),
        ...canActivate(unauthorized),
      },
      {
        path: ':idRepartidor',
        loadChildren: () =>
          import('./pages/repartidores-detail/repartidores-detail.module').then(
            (m) => m.RepartidoresDetailPageModule
          ),
        ...canActivate(unauthorized),
      },
    ],
  },
  {
    path: 'new-paquete',
    loadChildren: () =>
      import('./pages/new-paquete/new-paquete.module').then(
        (m) => m.NewPaquetePageModule
      ),
    ...canActivate(unauthorized),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    ...canActivate(logged),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    ...canActivate(logged),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
