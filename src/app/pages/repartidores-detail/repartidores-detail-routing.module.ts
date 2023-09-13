import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepartidoresDetailPage } from './repartidores-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RepartidoresDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepartidoresDetailPageRoutingModule {}
