import {
  ISimpleShipment,
} from '../../interfaces/SimpleShipmetInterfaces';

export interface SimpleShipmentDao {
  save(t: ISimpleShipment): Promise<ISimpleShipment>;
  getAll(): Promise<ISimpleShipment[]>;
  get(id: string): Promise<ISimpleShipment>;
  update(t: ISimpleShipment, id: string): Promise<ISimpleShipment>;
  delete(id: string): Promise<ISimpleShipment>;
}
