import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepartidoresDetailPageRoutingModule } from './repartidores-detail-routing.module';

import { RepartidoresDetailPage } from './repartidores-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepartidoresDetailPageRoutingModule
  ],
  declarations: [RepartidoresDetailPage]
})
export class RepartidoresDetailPageModule {}
