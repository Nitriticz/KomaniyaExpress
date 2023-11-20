import { Component, OnInit, ViewChild } from '@angular/core';
import { Paquete } from 'src/app/models/paquete.model';
import { PaqueteService } from 'src/app/services/paquete-service.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.page.html',
  styleUrls: ['./paquetes.page.scss'],
})
export class PaquetesPage implements OnInit {
  @ViewChild('all') private checkboxAll!: any;
  @ViewChild('delivered') private checkboxDelivered!: any;
  @ViewChild('undelivered') private checkboxUndelivered!: any;

  constructor(private paqueteService: PaqueteService) {}

  paquetes: Paquete[] = [];
  results = [...this.paquetes];

  ngOnInit() {
    this.paquetes = this.paqueteService.getPaquetesArray();
    this.results = [...this.paquetes];
  }

  ngDoCheck() {
    if (
      this.paquetes.length !== this.paqueteService.getPaquetesArray().length
    ) {
      this.paquetes = this.paqueteService.getPaquetesArray();
      this.results = [...this.paquetes];
    }
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.paquetes.filter(
      (p) =>
        p.etiqueta.toLowerCase().indexOf(query) > -1 ||
        p.id.toLowerCase().indexOf(query) > -1
    );
  }

  checkboxClick(event: any) {
    switch (event.target.name) {
      case 'ion-cb-0':
        this.checkboxDelivered.checked = false;
        this.checkboxUndelivered.checked = false;
        this.results = [...this.paquetes];
        break;
      case 'ion-cb-1':
        this.checkboxAll.checked = false;
        this.checkboxUndelivered.checked = false;
        this.results = this.paquetes.filter((p) => p.entregado);
        break;
      case 'ion-cb-2':
        this.checkboxAll.checked = false;
        this.checkboxDelivered.checked = false;
        this.results = this.paquetes.filter((p) => !p.entregado);
        break;
    }
  }
}
