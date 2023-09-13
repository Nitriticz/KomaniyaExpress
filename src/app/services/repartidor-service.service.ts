import { Injectable } from '@angular/core';
import { Repartidor } from '../models/repartidor.model';

@Injectable({
  providedIn: 'root'
})
export class RepartidorService {

  repartidores: Repartidor[] = [
    {
      id: "1",
      nombre: 'Gian Soto',
      fechaIngreso: new Date('1/1/23'),
      image: 'assets/img/profiles/gsoto.png',
    },
    {
      id: "2",
      nombre: 'Francisca Zerené',
      fechaIngreso: new Date('1/1/23'),
      image: 'assets/img/profiles/fzerene.png',
    },
    {
      id: "3",
      nombre: 'John Doe',
      fechaIngreso: new Date('1/12/23'),
      image: 'assets/img/profiles/default.png',
    },
    {
      id: "4",
      nombre: 'Kau',
      fechaIngreso: new Date('2/24/23'),
      image: 'assets/img/profiles/kau.png',
    },
    {
      id: "5",
      nombre: 'Manuel Muñoz',
      fechaIngreso: new Date('3/4/23'),
      image: 'assets/img/profiles/mmunoz.png',
    },
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
