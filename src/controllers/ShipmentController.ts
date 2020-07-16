import ShipmentPostgreSql from '../models/Shipment/ShipmentPostgreSql';
import ResponseOperation from '../helpers/ResponseOperation';
import { HttpCode } from '../helpers/HttpCodes';
import {
  IShipment,
  IShipmentController,
} from '../interfaces/ShipmentInterfaces';

export default class ShipmentController implements IShipmentController {
  sqlShipment: ShipmentPostgreSql;

  constructor() {
    this.sqlShipment = new ShipmentPostgreSql();
  }

  public async createShipment(shipment: IShipment): Promise<ResponseOperation<IShipment>> {
    return this.sqlShipment
      .save(shipment)
      .then((newShipment: IShipment) => {
        return Promise.resolve(
          new ResponseOperation<IShipment>(true, HttpCode.CREATED, newShipment)
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<IShipment>(false, HttpCode.INTERNAL_ERROR, null, err)
        );
      });
  }

  public async getShipments(q: any, date: any): Promise<ResponseOperation<IShipment[]>> {
    return this.sqlShipment
      .getAll(q, date)
      .then((shipments: IShipment[]) => {
        return Promise.resolve(
          new ResponseOperation<IShipment[]>(true, HttpCode.OK, shipments)
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<IShipment>(false, HttpCode.INTERNAL_ERROR, null, err)
        );
      });
  }

  public async getShipmentById(id: string): Promise<ResponseOperation<IShipment>> {
    return this.sqlShipment
      .get(id)
      .then((shipment: IShipment) => {
        return Promise.resolve(
          new ResponseOperation<IShipment>(true, HttpCode.OK, shipment)
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<IShipment>(false, HttpCode.INTERNAL_ERROR, null, err)
        );
      });
  }

  public async updateShipment(id: string, shipment: IShipment): Promise<ResponseOperation<IShipment>> {
    return this.sqlShipment
      .update(shipment, id)
      .then((newShipment: IShipment) => {
        return Promise.resolve(
          new ResponseOperation<IShipment>(true, HttpCode.OK, newShipment)
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<IShipment>(false, HttpCode.INTERNAL_ERROR, null, err)
        );
      });
  }

  public async deleteShipment(id: string): Promise<ResponseOperation<IShipment>> {
    return this.sqlShipment
      .delete(id)
      .then((deletedShipment: IShipment) => {
        return Promise.resolve(
          new ResponseOperation<IShipment>(true, HttpCode.OK, deletedShipment)
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<IShipment>(false, HttpCode.INTERNAL_ERROR, null, err)
        );
      });
  }

  public async getExportData(): Promise<ResponseOperation<any>> {
    return this.sqlShipment
        .getExportData()
        .then((shipments: any) => {
          return Promise.resolve(
              new ResponseOperation<any>(true, HttpCode.OK, shipments)
          );
        })
        .catch((err) => {
          return Promise.reject(
              new ResponseOperation<any>(false, HttpCode.INTERNAL_ERROR, null, err)
          );
        });
  }
}
