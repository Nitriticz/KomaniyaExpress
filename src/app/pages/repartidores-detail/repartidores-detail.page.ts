import { Component, OnInit } from '@angular/core';
import { Repartidor } from 'src/app/models/repartidor.model';
import { Paquete } from 'src/app/models/paquete.model';
import { RepartidorService } from 'src/app/services/repartidor-service.service';
import { PaqueteService } from 'src/app/services/paquete-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-repartidores-detail',
  templateUrl: './repartidores-detail.page.html',
  styleUrls: ['./repartidores-detail.page.scss'],
})
export class RepartidoresDetailPage implements OnInit {

  repartidor!: Repartidor
  pendientes!: Paquete[]
  entregados!: Paquete[]

  constructor(private repartidorService: RepartidorService, private paqueteService: PaqueteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id:unknown = params.get('idRepartidor')
      if (id !== null) {
        this.repartidor = this.repartidorService.getRepartidor(id as string)
        this.pendientes = this.paqueteService.getPendsRep(this.repartidor.id)
        this.entregados = this.paqueteService.getDelivsRep(this.repartidor.id)
      } else {
        this.router.navigate(['/home'])
      }
    })
  }

  getCantPends(id: string): number {
    return this.paqueteService.getCantPends(id)
  }

  getCantDelivs(id: string): number {
    return this.paqueteService.getCantDelivs(id)
  }

}
