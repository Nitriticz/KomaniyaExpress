import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Repartidor } from 'src/app/models/repartidor.model';
import { PaqueteService } from 'src/app/services/paquete-service.service'
import { RepartidorService } from 'src/app/services/repartidor-service.service';

@Component({
  selector: 'app-new-paquete',
  templateUrl: './new-paquete.page.html',
  styleUrls: ['./new-paquete.page.scss'],
})
export class NewPaquetePage implements OnInit {

  constructor(private fb: FormBuilder, private paqueteService: PaqueteService, private router: Router, private repartidorService: RepartidorService) {
    this.pedidoForm = this.fb.group({  
        'etiqueta': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        'descripcion': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        'direccion': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        'repartidor': ['']
    });
  }

  ngOnInit() {
  }

  repartidores: Repartidor[] = this.repartidorService.getRepartidores();
  public pedidoForm!: FormGroup
  public repartidor!: string
  repartidorSelected!: Repartidor
  isAlertOpen = false
  public alertButtons = [
    {
      text: 'Volver a la lista de Paquetes',
      handler: () => {
        this.pedidoForm.reset()
        this.router.navigate(['/paquetes'])
      },
    },
    {
      text: 'Guardar otro Paquete',
      handler: () => {
        this.pedidoForm.reset()
      },
    }
  ]

  public results = [...this.repartidores];
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.repartidores.filter((d) => d.nombre.toLowerCase().indexOf(query) > -1);
  }

  asignRepartidor(id: string) {
    let nombreRep = this.repartidorService.getRepartidor(id).nombre
    if (this.repartidor === nombreRep) {
      this.repartidor = ''
      this.repartidorSelected != undefined
    } else {
      this.repartidor = nombreRep
      this.repartidorSelected = this.repartidorService.getRepartidor(id)
    }
  }

  getCantPends(id: string): number {
    return this.paqueteService.getCantPends(id)
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  addPaquete() {
    this.paqueteService.addPaquete(this.pedidoForm.value.etiqueta, this.pedidoForm.value.descripcion, this.pedidoForm.value.direccion, this.repartidorSelected)
    this.setOpen(true)
  }

}
