import { Component, OnInit } from '@angular/core';
import { Repartidor } from 'src/app/models/repartidor.model';
import { RepartidorService } from 'src/app/services/repartidor-service.service';
import { PaqueteService } from 'src/app/services/paquete-service.service';

@Component({
  selector: 'app-repartidores',
  templateUrl: './repartidores.page.html',
  styleUrls: ['./repartidores.page.scss'],
})
export class RepartidoresPage implements OnInit {

  constructor(private repartidorService: RepartidorService, private paqueteService: PaqueteService) { }

  repartidores: Repartidor[] = this.repartidorService.getRepartidores()

  ngOnInit() {
  }

  results = [...this.repartidores]
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.repartidores.filter((r) => r.nombre.toLowerCase().indexOf(query) > -1);
  }

  getCantPends(id: string): number {
    return this.paqueteService.getCantPends(id)
  }

}
