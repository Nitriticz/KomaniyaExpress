import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaquetesDetailPageRoutingModule } from './paquetes-detail-routing.module';

import { PaquetesDetailPage } from './paquetes-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaquetesDetailPageRoutingModule
  ],
  declarations: [PaquetesDetailPage]
})
export class PaquetesDetailPageModule {}
