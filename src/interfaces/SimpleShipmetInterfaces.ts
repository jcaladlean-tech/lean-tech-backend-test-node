import ResponseOperation from '../helpers/ResponseOperation';

export interface IContact {
  company: string;
  address: string;
  name: string;
  email: string;
  phone: string;
}

export interface ILocation {
  city: string;
  state: string;
  country: string;
  zip: string;
  contact: IContact;
}

export interface IProduct {
  itemName: string;
  description: string;
  pieces: number;
  quantity: number;
  weight: number;
  packageType: string;
  freightClass: string;
  hazmat: boolean;
}

export interface ISimpleShipment {
  _id?: string;
  quoteRefId?: string;
  from?: ILocation;
  to?: ILocation;
  products?: IProduct;
  accessorials?: string[];
  instructionsShipper?: string;
  instructionsConsignee?: string;
  references?: string[];
}

export interface ISimpleShipmentController {
  createSimpleShipment(
    shipment: ISimpleShipment
  ): Promise<ResponseOperation<ISimpleShipment>>;
  getSimpleShipments(): Promise<ResponseOperation<ISimpleShipment[]>>;
  getSimpleShipmentById(
    id: string
  ): Promise<ResponseOperation<ISimpleShipment>>;
  updateSimpleShipment(
    id: string,
    shipment: ISimpleShipment
  ): Promise<ResponseOperation<ISimpleShipment>>;
  deleteSimpleShipment(id: string): Promise<ResponseOperation<ISimpleShipment>>;
}
