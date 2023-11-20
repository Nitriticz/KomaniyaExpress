import { Injectable } from '@angular/core';
import { Paquete } from '../models/paquete.model';
import { Repartidor } from '../models/repartidor.model';
import { RepartidorService } from './repartidor-service.service';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docSnapshots,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PaqueteService {
  paquetes: Paquete[] = [];

  constructor(
    private repartidorService: RepartidorService,
    private firestore: Firestore
  ) {}

  async getPaquetes(): Promise<Paquete[]> {
    const snapShot = await getDocs(
      query(
        collection(this.firestore, 'paquetes'),
        orderBy('fechaSolicitud', 'desc')
      )
    );
    snapShot.forEach((paquete) => {
      this.paquetes.push({
        id: paquete.id,
        etiqueta: paquete.data()['etiqueta'],
        descripcion: paquete.data()['descripcion'],
        fechaSolicitud: new Date(paquete.data()['fechaSolicitud'].toDate()),
        entregado: paquete.data()['entregado'],
        direccion: paquete.data()['direccion'],
        fechaEntrega: new Date(paquete.data()['fechaEntrega']?.toDate()),
        repartidor: paquete.data()['repartidor'],
      });
    });
    return [...this.paquetes];
  }

  getPaquetesArray(): Paquete[] {
    return [...this.paquetes];
  }

  getPaquete(id: string): Paquete {
    return {
      ...this.paquetes.find((p) => {
        return p.id === id;
      }),
    } as Paquete;
  }

  async addPaquete(
    etiqueta: string,
    descripcion: string,
    direccion: string,
    repartidor?: Repartidor
  ): Promise<void> {
    let newPaquete = {};
    if (repartidor) {
      newPaquete = {
        etiqueta: etiqueta,
        descripcion: descripcion,
        fechaSolicitud: new Date(),
        repartidor: repartidor,
        entregado: false,
        direccion: direccion,
      };
    } else {
      newPaquete = {
        etiqueta: etiqueta,
        descripcion: descripcion,
        fechaSolicitud: new Date(),
        entregado: false,
        direccion: direccion,
      };
    }
    const docRef = await addDoc(
      collection(this.firestore, 'paquetes'),
      newPaquete
    );
    this.paquetes.unshift({ id: docRef.id, ...newPaquete } as Paquete);
  }

  checkDelivery(id: string) {
    this.paquetes.map((p) => {
      if (p.id === id) {
        p.entregado = true;
        p.fechaEntrega = new Date();
        updateDoc(doc(this.firestore, 'paquetes', id), { ...p });
      }
    });
  }

  getCantPends(id: string): number {
    let count = 0;
    this.paquetes.find((p) => {
      p.repartidor
        ? p.repartidor.id === id && !p.entregado
          ? (count += 1)
          : 0
        : 0;
    });
    return count;
  }

  getCantDelivs(id: string): number {
    let count = 0;
    this.paquetes.find((p) => {
      p.repartidor
        ? p.repartidor.id === id && p.entregado
          ? (count += 1)
          : 0
        : 0;
    });
    return count;
  }

  asignRepartidor(repartidor: Repartidor, id: string) {
    this.paquetes.find((p) => {
      if (p.id === id) {
        p.repartidor = repartidor;
        let { fechaEntrega, ...newPaquete } = p;
        updateDoc(doc(this.firestore, 'paquetes', id), newPaquete);
      }
    });
  }

  getPendsRep(id: string): Paquete[] {
    return [
      ...this.paquetes.filter((p) => {
        return p.repartidor?.id === id && !p.entregado;
      }),
    ];
  }

  getDelivsRep(id: string): Paquete[] {
    return [
      ...this.paquetes.filter((p) => {
        return p.repartidor?.id === id && p.entregado;
      }),
    ];
  }

  getUltPaquete(): Paquete {
    return {
      ...this.paquetes[0],
    } as Paquete;
  }

  getMejRepartidor(): Repartidor {
    let repartidores = this.repartidorService.getRepartidores();
    let max = 0;
    let mejRepartidor = this.repartidorService.getRepartidor('1');
    repartidores.forEach((r) => {
      if (this.getCantDelivs(r.id) > max) {
        mejRepartidor = r;
      }
    });
    return mejRepartidor;
  }
}
