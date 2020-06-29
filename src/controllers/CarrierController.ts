import CarrierPostgreSql from '../models/Carrier/CarrierPostgreSql';
import ResponseOperation from '../helpers/ResponseOperation';
import { HttpCode } from '../helpers/HttpCodes';
import {
  ICarrier,
  ICarrierController,
} from '../interfaces/CarrierInterfaces';

export default class CarrierController implements ICarrierController {
  sqlCarrier: CarrierPostgreSql;

  constructor() {
    this.sqlCarrier = new CarrierPostgreSql();
  }

  public async createCarrier(carrier: ICarrier): Promise<ResponseOperation<ICarrier>> {
    return this.sqlCarrier
        .save(carrier)
        .then((newCarrier: ICarrier) => {
          return Promise.resolve(
              new ResponseOperation<ICarrier>(true, HttpCode.CREATED, newCarrier)
          );
        })
        .catch((err) => {
          return Promise.reject(
              new ResponseOperation<ICarrier>(false, HttpCode.INTERNAL_ERROR, null, err)
          );
        });
  }

  public async getCarriers(): Promise<ResponseOperation<ICarrier[]>> {
    return this.sqlCarrier
        .getAll()
        .then((carriers: ICarrier[]) => {
          return Promise.resolve(
              new ResponseOperation<ICarrier[]>(true, HttpCode.OK, carriers)
          );
        })
        .catch((err) => {
          return Promise.reject(
              new ResponseOperation<ICarrier>(false, HttpCode.INTERNAL_ERROR, null, err)
          );
        });
  }

  public async getCarrierById(id: string): Promise<ResponseOperation<ICarrier>> {
    return this.sqlCarrier
        .get(id)
        .then((carrier: ICarrier) => {
          return Promise.resolve(
              new ResponseOperation<ICarrier>(true, HttpCode.OK, carrier)
          );
        })
        .catch((err) => {
          return Promise.reject(
              new ResponseOperation<ICarrier>(false, HttpCode.INTERNAL_ERROR, null, err)
          );
        });
  }

  public async updateCarrier(id: string, carrier: ICarrier): Promise<ResponseOperation<ICarrier>> {
    return this.sqlCarrier
        .update(carrier, id)
        .then((updatedCarrier: ICarrier) => {
          return Promise.resolve(
              new ResponseOperation<ICarrier>(true, HttpCode.OK, updatedCarrier)
          );
        })
        .catch((err) => {
          return Promise.reject(
              new ResponseOperation<ICarrier>(false, HttpCode.INTERNAL_ERROR, null, err)
          );
        });
  }

  public async deleteCarrier(id: string): Promise<ResponseOperation<ICarrier>> {
    return this.sqlCarrier
        .delete(id)
        .then((deletedCarrier: ICarrier) => {
          return Promise.resolve(
              new ResponseOperation<ICarrier>(true, HttpCode.OK, deletedCarrier)
          );
        })
        .catch((err) => {
          return Promise.reject(
              new ResponseOperation<ICarrier>(false, HttpCode.INTERNAL_ERROR, null, err)
          );
        });
  }
}
