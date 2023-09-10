import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaquetesDetailPage } from './paquetes-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PaquetesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaquetesDetailPageRoutingModule {}
