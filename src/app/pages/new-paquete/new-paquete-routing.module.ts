import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPaquetePage } from './new-paquete.page';

const routes: Routes = [
  {
    path: '',
    component: NewPaquetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPaquetePageRoutingModule {}
