import { Component, OnInit } from '@angular/core';
import { Repartidor } from 'src/app/models/repartidor.model';
import { repartidorService } from 'src/app/services/repartidor-service.service';

@Component({
  selector: 'app-repartidores',
  templateUrl: './repartidores.page.html',
  styleUrls: ['./repartidores.page.scss'],
})
export class RepartidoresPage implements OnInit {

  repartidores!: Repartidor[]

  constructor(private repartidorService: repartidorService) { }

  ngOnInit() {
    this.repartidores = this.repartidorService.getRepartidores();
  }
}
