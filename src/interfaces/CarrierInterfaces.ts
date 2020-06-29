import ResponseOperation from '../helpers/ResponseOperation';

export interface ICarrier {
    scac?: string;
    id?: number;
    name?: string;
    mc?: number;
    dot?: number;
    fein?: string;
}

export interface ICarrierController {
    createCarrier(carrier: ICarrier): Promise<ResponseOperation<ICarrier>>;
    getCarriers(): Promise<ResponseOperation<ICarrier[]>>;
    getCarrierById(id: string): Promise<ResponseOperation<ICarrier>>;
    updateCarrier(id: string, carrier: ICarrier): Promise<ResponseOperation<ICarrier>>;
    deleteCarrier(id: string): Promise<ResponseOperation<ICarrier>>;
}
