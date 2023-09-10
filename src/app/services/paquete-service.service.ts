import { Injectable } from '@angular/core';
import { Paquete } from '../models/paquete.model';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  paquetes: Paquete[] = [
    {
      id: "1",
      etiqueta: 'Paquete de regalo para cumpleaños',
      descripcion: 'Paquete rectangular de tamaño mediano, envuelto en papel de regalo de colores brillantes. Contiene una tarjeta de cumpleaños, una caja de chocolates, y un peluche de oso.',
      fechaSolicitud: new Date('2/2/20'),
      entregado: false
    },
    {
      id: "2",
      etiqueta: 'Documentos importantes',
      descripcion: 'Un sobre manila de tamaño legal que contiene documentos legales y contratos. Peso ligero y debe ser manejado con cuidado.',
      fechaSolicitud: new Date('14/2/20'),
      entregado: false
    },
    {
      id: "3",
      etiqueta: 'Ropa de invierno',
      descripcion: 'Una caja grande que contiene una chaqueta de invierno, bufandas, guantes y botas. Peso aproximado de 5 kg.',
      fechaSolicitud: new Date('12/3/20'),
      entregado: false
    },
    {
      id: "4",
      etiqueta: 'Productos electrónicos frágiles',
      descripcion: 'Una caja pequeña que contiene un teléfono celular y una tablet. Los artículos son frágiles, por lo que se requiere un manejo delicado.',
      fechaSolicitud: new Date('4/4/20'),
      entregado: false
    },
    {
      id: "5",
      etiqueta: 'Libros para donación',
      descripcion: 'Una caja grande llena de libros usados para donación. Peso aproximado de 10 kg.',
      fechaSolicitud: new Date('6/5/20'),
      entregado: false
    },
    {
      id: "6",
      etiqueta: 'Muestras comerciales',
      descripcion: 'Una caja con muestras de productos cosméticos para una feria comercial. Contiene botellas pequeñas de cremas y lociones.',
      fechaSolicitud: new Date('17/5/20'),
      entregado: false
    },
    {
      id: "7",
      etiqueta: 'Piezas de repuesto automotrices',
      descripcion: 'Una caja mediana con piezas de repuesto para un vehículo, como filtros de aceite, bujías y correas.',
      fechaSolicitud: new Date('21/6/20'),
      entregado: false
    },
    {
      id: "8",
      etiqueta: 'Arte frágil',
      descripcion: 'Un paquete rectangular grande que contiene una pintura al óleo en lienzo. Se debe manejar con extrema precaución.',
      fechaSolicitud: new Date('28/6/20'),
      entregado: false
    },
    {
      id: "9",
      etiqueta: 'Muestras de alimentos perecederos',
      descripcion: 'Una caja refrigerada que contiene muestras de productos alimenticios, como quesos y embutidos. Se requiere envío rápido.',
      fechaSolicitud: new Date('30/7/20'),
      entregado: false
    },
    {
      id: "10",
      etiqueta: 'Regalos de boda',
      descripcion: 'Varios paquetes que contienen regalos de boda, como vajilla, cristalería y utensilios de cocina. Deben ser entregados en el mismo destino.',
      fechaSolicitud: new Date('14/8/20'),
      entregado: false
    },
  ]

  constructor() { }

  getPaquetes(): Paquete[] {
    return [...this.paquetes]
  }

  getPaquete(id: string): Paquete {
    return {...this.paquetes.find(p => {
      return p.id === id})} as Paquete
  }

  checkDelivery(id: string): void {
    this.paquetes.map(p => {
      if (p.id === id){
        p.entregado = true
        p.fechaEntrega = new Date()
      }
    })
  }
}
