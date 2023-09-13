import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paquete } from 'src/app/models/paquete.model';
import { Repartidor } from 'src/app/models/repartidor.model';
import { PaqueteService } from 'src/app/services/paquete-service.service';
import { RepartidorService } from 'src/app/services/repartidor-service.service';

@Component({
  selector: 'app-paquetes-detail',
  templateUrl: './paquetes-detail.page.html',
  styleUrls: ['./paquetes-detail.page.scss'],
})
export class PaquetesDetailPage implements OnInit {

  constructor(private paqueteService: PaqueteService, private repartidorService: RepartidorService, private activatedRoute: ActivatedRoute, private router: Router) { }

  paquete!: Paquete
  repartidores: Repartidor[] = this.repartidorService.getRepartidores();

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id:unknown = params.get('idPaquete')
      if (id !== null) {
        this.paquete = this.paqueteService.getPaquete(id as string)
      } else {
        this.router.navigate(['/home'])
      }
    })
  }

  public results = [...this.repartidores];
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.repartidores.filter((d) => d.nombre.toLowerCase().indexOf(query) > -1);
  }

  asignRepartidor(repartidor: Repartidor,id: string) {
    this.paqueteService.asignRepartidor(repartidor, id)
    this.refresh()
  }

  checkDelivered() {
    this.paqueteService.checkDelivery(this.paquete.id)
    this.refresh()
  }

  getCantPends(id: string): number {
    return this.paqueteService.getCantPends(id)
  }

  refresh() {
    this.paquete = this.paqueteService.getPaquete(this.paquete.id)
  }

}
