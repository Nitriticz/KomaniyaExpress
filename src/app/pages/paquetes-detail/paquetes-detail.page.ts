import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paquete } from 'src/app/models/paquete.model';
import { PaqueteService } from 'src/app/services/paquete-service.service';

@Component({
  selector: 'app-paquetes-detail',
  templateUrl: './paquetes-detail.page.html',
  styleUrls: ['./paquetes-detail.page.scss'],
})
export class PaquetesDetailPage implements OnInit {

  paquete!: Paquete

  constructor(private paqueteService: PaqueteService, private activatedRoute: ActivatedRoute, private router: Router) { }

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

  asignRepartidor() {

  }

  checkDelivered() {
    this.paqueteService.checkDelivery(this.paquete.id)
  }

}
