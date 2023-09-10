import { Repartidor } from "./repartidor.model"

export interface Paquete {
    id: string,
    etiqueta: string,
    descripcion: string,
    fechaSolicitud: Date,
    entregado: boolean,
    fechaEntrega?: Date,
    repartidor?: Repartidor
}