import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPaquetePageRoutingModule } from './new-paquete-routing.module';

import { NewPaquetePage } from './new-paquete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewPaquetePageRoutingModule
  ],
  declarations: [NewPaquetePage],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewPaquetePageModule {}
