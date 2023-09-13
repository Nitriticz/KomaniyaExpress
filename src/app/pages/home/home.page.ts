import { Component, OnInit } from '@angular/core';
import { Paquete } from 'src/app/models/paquete.model';
import { Repartidor } from 'src/app/models/repartidor.model';
import { PaqueteService } from 'src/app/services/paquete-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  ultPaquete: Paquete = this.paqueteService.getUltPaquete()
  mejRepartidor: Repartidor = this.paqueteService.getMejRepartidor()
  
  constructor(private paqueteService: PaqueteService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.ultPaquete !== this.paqueteService.getUltPaquete()) {
      this.ultPaquete = this.paqueteService.getUltPaquete()
    }
    if (this.mejRepartidor !== this.paqueteService.getMejRepartidor()) {
      this.mejRepartidor = this.paqueteService.getMejRepartidor()
    }
  }
  
  getCantDelivs() {
    return this.paqueteService.getCantDelivs(this.mejRepartidor.id)
  }

}
