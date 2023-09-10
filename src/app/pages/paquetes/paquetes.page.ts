import { Component, OnInit } from '@angular/core';
import { Paquete } from 'src/app/models/paquete.model';
import { PaqueteService } from 'src/app/services/paquete-service.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.page.html',
  styleUrls: ['./paquetes.page.scss'],
})
export class PaquetesPage implements OnInit {

  paquetes: Paquete[] = []

  constructor(private paqueteService: PaqueteService) { }

  ngOnInit() {
    this.paquetes = this.paqueteService.getPaquetes()
  }

}
