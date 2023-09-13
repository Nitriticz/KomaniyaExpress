import { Injectable } from '@angular/core';
import { Paquete } from '../models/paquete.model';
import { Repartidor } from '../models/repartidor.model';
import { RepartidorService } from './repartidor-service.service';

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
      entregado: false,
      direccion :'Calle Primavera 123, Ciudad Esperanza'
    },
    {
      id: "2",
      etiqueta: 'Documentos importantes',
      descripcion: 'Un sobre manila de tamaño legal que contiene documentos legales y contratos. Peso ligero y debe ser manejado con cuidado.',
      fechaSolicitud: new Date('2/14/20'),
      entregado: false,
      direccion: 'Avenida Central 456, Oficina 301, Ciudad Capital'
    },
    {
      id: "3",
      etiqueta: 'Ropa de invierno',
      descripcion: 'Una caja grande que contiene una chaqueta de invierno, bufandas, guantes y botas. Peso aproximado de 5 kg.',
      fechaSolicitud: new Date('3/12/20'),
      entregado: false,
      direccion: 'Calle del Bosque 789, Ciudad Invierno'
    },
    {
      id: "4",
      etiqueta: 'Productos electrónicos frágiles',
      descripcion: 'Una caja pequeña que contiene un teléfono celular y una tablet. Los artículos son frágiles, por lo que se requiere un manejo delicado.',
      fechaSolicitud: new Date('4/4/20'),
      entregado: false,
      direccion: 'Paseo de la Tecnología 101, Apartamento 202, Ciudad Tecnológica'
    },
    {
      id: "5",
      etiqueta: 'Libros para donación',
      descripcion: 'Una caja grande llena de libros usados para donación. Peso aproximado de 10 kg.',
      fechaSolicitud: new Date('5/6/20'),
      entregado: false,
      direccion: 'Calle de la Educación 321, Ciudad Cultura'
    },
    {
      id: "6",
      etiqueta: 'Muestras comerciales',
      descripcion: 'Una caja con muestras de productos cosméticos para una feria comercial. Contiene botellas pequeñas de cremas y lociones.',
      fechaSolicitud: new Date('5/17/20'),
      entregado: false,
      direccion: 'Avenida de la Moda 789, Local 15, Ciudad Glamour'
    },
    {
      id: "7",
      etiqueta: 'Piezas de repuesto automotrices',
      descripcion: 'Una caja mediana con piezas de repuesto para un vehículo, como filtros de aceite, bujías y correas.',
      fechaSolicitud: new Date('6/21/20'),
      entregado: false,
      direccion: 'Calle del Automóvil 567, Ciudad Motor'
    },
    {
      id: "8",
      etiqueta: 'Arte frágil',
      descripcion: 'Un paquete rectangular grande que contiene una pintura al óleo en lienzo. Se debe manejar con extrema precaución.',
      fechaSolicitud: new Date('6/28/20'),
      entregado: false,
      direccion: 'Calle de las Bellas Artes 101, Ciudad Artística'
    },
    {
      id: "9",
      etiqueta: 'Muestras de alimentos perecederos',
      descripcion: 'Una caja refrigerada que contiene muestras de productos alimenticios, como quesos y embutidos. Se requiere envío rápido.',
      fechaSolicitud: new Date('7/30/20'),
      entregado: false,
      direccion: 'Avenida de la Gastronomía 234, Cocina Central, Ciudad Delicia'
    },
    {
      id: "10",
      etiqueta: 'Regalos de boda',
      descripcion: 'Varios paquetes que contienen regalos de boda, como vajilla, cristalería y utensilios de cocina. Deben ser entregados en el mismo destino.',
      fechaSolicitud: new Date('8/14/20'),
      entregado: false,
      direccion: 'Calle del Amor Eterno 789, Salón de Eventos Felicidad, Ciudad del Amor'
    },
  ]

  constructor(private repartidorService: RepartidorService) { }

  getPaquetes(): Paquete[] {
    return [...this.paquetes]
  }

  getPaquete(id: string): Paquete {
    return {...this.paquetes.find(p => {
      return p.id === id})} as Paquete
  }

  addPaquete(etiqueta: string, descripcion: string, direccion: string, repartidor?: Repartidor): void {
    this.paquetes.push({
      id: this.paquetes.length + 1 + '',
      etiqueta: etiqueta,
      descripcion: descripcion,
      fechaSolicitud: new Date(),
      repartidor: repartidor,
      entregado: false,
      direccion: direccion
    })
  }

  checkDelivery(id: string) {
    this.paquetes.map(p => {
      if (p.id === id){
        p.entregado = true
        p.fechaEntrega = new Date()
      }
    })
  }

  getCantPends(id: string): number {
    let count = 0
    this.paquetes.find(p => {
      p.repartidor ? (p.repartidor.id === id && !p.entregado ? count += 1 : 0) : 0
    })
    return count
  }

  getCantDelivs(id: string): number {
    let count = 0
    this.paquetes.find(p => {
      p.repartidor ? (p.repartidor.id === id && p.entregado ? count += 1 : 0) : 0
    })
    return count
  }

  asignRepartidor(repartidor: Repartidor, id: string) {
    this.paquetes.find(p => {
      p.id === id ? p.repartidor = repartidor : undefined
    })
  }

  getPendsRep(id: string): Paquete[] {
    return [...this.paquetes.filter(p => {
      return p.repartidor?.id === id && !p.entregado
    })]
  }

  getDelivsRep(id: string): Paquete[] {
    return [...this.paquetes.filter(p => {
      return p.repartidor?.id === id && p.entregado
    })]
  }

  getUltPaquete(): Paquete {
    return {
      ...this.paquetes.find(p => {return p.id === this.paquetes.length.toString()})
    } as Paquete
  }

  getMejRepartidor(): Repartidor { 
    let repartidores = this.repartidorService.getRepartidores()
    let max = 0
    let mejRepartidor = this.repartidorService.getRepartidor('1')
    repartidores.forEach(r => {
      if (this.getCantDelivs(r.id) > max) {
        mejRepartidor = r
      }
    })
    return mejRepartidor
  }

}
