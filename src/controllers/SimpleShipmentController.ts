import SimpleShipmentDaoMongo from '../models/SimpleShipment/SimpleShipmentDaoMongo';
import SimpleShipmentDaoPostgreSql from '../models/SimpleShipment/SimpleShipmentDaoPostgreSql';
import { SimpleShipmentDao } from '../models/SimpleShipment/SimpleShipmentDao';
import ResponseOperation from '../helpers/ResponseOperation';
import { HttpCode } from '../helpers/HttpCodes';
import {
  ISimpleShipment,
  ISimpleShipmentController,
} from '../interfaces/SimpleShipmetInterfaces';

export default class ProductController implements ISimpleShipmentController {
  simpleShipment: SimpleShipmentDao;

  constructor(db: string) {
    if (db === 'mongo') this.simpleShipment = new SimpleShipmentDaoMongo();
    if (db === 'sql') this.simpleShipment = new SimpleShipmentDaoPostgreSql();
  }

  public async createSimpleShipment(shipment: ISimpleShipment): Promise<ResponseOperation<ISimpleShipment>> {
    return this.simpleShipment
      .save(shipment)
      .then((newShipment: ISimpleShipment) => {
        return Promise.resolve(
          new ResponseOperation<ISimpleShipment>(true, HttpCode.CREATED, newShipment)
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<ISimpleShipment>(false, HttpCode.INTERNAL_ERROR, null, err)
        );
      });
  }

  public async getSimpleShipments(): Promise<ResponseOperation<ISimpleShipment[]>> {
    return this.simpleShipment
      .getAll()
      .then((shipments: ISimpleShipment[]) => {
        return Promise.resolve(
          new ResponseOperation<ISimpleShipment[]>(true, HttpCode.OK, shipments)
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<ISimpleShipment>(false, HttpCode.INTERNAL_ERROR, null, err)
        );
      });
  }

  public async getSimpleShipmentById(id: string): Promise<ResponseOperation<ISimpleShipment>> {
    return this.simpleShipment
      .get(id)
      .then((shipment: ISimpleShipment) => {
        return Promise.resolve(
          new ResponseOperation<ISimpleShipment>(true, HttpCode.OK, shipment)
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<ISimpleShipment>(false, HttpCode.INTERNAL_ERROR, null, err)
        );
      });
  }

  public async updateSimpleShipment(id: string, shipment: ISimpleShipment): Promise<ResponseOperation<ISimpleShipment>> {
    return this.simpleShipment
      .update(shipment, id)
      .then((newShipment: ISimpleShipment) => {
        return Promise.resolve(
          new ResponseOperation<ISimpleShipment>(true, HttpCode.OK, newShipment)
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<ISimpleShipment>(false, HttpCode.INTERNAL_ERROR, null, err)
        );
      });
  }

  deleteSimpleShipment(id: string): Promise<ResponseOperation<ISimpleShipment>> {
    return this.simpleShipment
      .delete(id)
      .then((deletedShipment: ISimpleShipment) => {
        return Promise.resolve(
          new ResponseOperation<ISimpleShipment>(true, HttpCode.OK, deletedShipment)
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<ISimpleShipment>(false, HttpCode.INTERNAL_ERROR, null, err)
        );
      });
  }
}
