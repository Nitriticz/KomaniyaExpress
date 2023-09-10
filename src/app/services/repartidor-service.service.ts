import { Injectable } from '@angular/core';
import { Repartidor } from '../models/repartidor.model';

@Injectable({
  providedIn: 'root'
})
export class repartidorService {

  repartidores: Repartidor[] = [
    {
      id: "1",
      nombre: 'Gian Soto',
      fechaIngreso: new Date('1/1/20')
    },
    {
      id: "2",
      nombre: 'John Doe',
      fechaIngreso: new Date('1/1/20')
    }
  ];

  constructor() { }

  getRepartidores(): Repartidor[] {
    return [...this.repartidores];
  }

  getRepartidor(id: string): Repartidor {
    return {...this.repartidores.find(r => {
      return r.id === id;
    })} as Repartidor
  }
}
