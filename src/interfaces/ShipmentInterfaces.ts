import ResponseOperation from '../helpers/ResponseOperation';

export interface IShipment {
    id?: number;
    carrierId?: number;
    date?: string;
    originCountry?: string;
    originState?: string;
    originCity?: string;
    destinationCountry?: string;
    destinationState?: string;
    destinationCity?: string;
    pickupdate?: string;
    deliveryDate?: string;
    status?: string;
    carrierRate?: number;
}

export interface IShipmentController {
    createShipment(shipment: IShipment): Promise<ResponseOperation<IShipment>>;
    getShipments(q: any, date: any): Promise<ResponseOperation<IShipment[]>>;
    getShipmentById(id: string): Promise<ResponseOperation<IShipment>>;
    updateShipment(id: string, shipment: IShipment): Promise<ResponseOperation<IShipment>>;
    deleteShipment(id: string): Promise<ResponseOperation<IShipment>>;
}
