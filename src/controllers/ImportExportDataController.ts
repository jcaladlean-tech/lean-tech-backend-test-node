import CarrierPostgreSql from '../models/Carrier/CarrierPostgreSql';
import ShipmentPostgreSql from '../models/Shipment/ShipmentPostgreSql';
import { ICarrier } from '../interfaces/CarrierInterfaces';
import { IShipment } from '../interfaces/ShipmentInterfaces';
import ResponseOperation from '../helpers/ResponseOperation';
import excelToJson from 'convert-excel-to-json';
import fs from 'fs';
import { HttpCode } from '../helpers/HttpCodes';

export default class ImportExportDataController {
  sqlCarrier: CarrierPostgreSql;
  sqlShipment: ShipmentPostgreSql;

  constructor() {
    this.sqlCarrier = new CarrierPostgreSql();
    this.sqlShipment = new ShipmentPostgreSql();
  }

  public async importData(filePath: string, sheetName: string): Promise<ResponseOperation<{msg: string, total: number}>> {
    const data = this.xlsxToJson(filePath, sheetName);
    const dataLength = data.length;
    return Promise.all(
      sheetName === 'Carrier'
        ? data.map(async (carrier: ICarrier) => {
            const {
              scac = null,
              id = null,
              name = null,
              mc = null,
              dot = null,
              fein = null,
            } = carrier;
            const prototypeCarrier: ICarrier = {
              scac,
              id,
              name,
              mc,
              dot,
              fein,
            };
            return this.sqlCarrier.save(prototypeCarrier);
          })
        : data.map(async (shipment: IShipment) => {
            const {
              carrierId = null,
              date = null,
              originCountry = null,
              originState = null,
              originCity = null,
              destinationCountry = null,
              destinationState = null,
              destinationCity = null,
              pickupdate = null,
              deliveryDate = null,
              status = null,
              carrierRate = null,
            } = shipment;
            const prototypeShipment: IShipment = {
              carrierId,
              date,
              originCountry,
              originState,
              originCity,
              destinationCountry,
              destinationState,
              destinationCity,
              pickupdate,
              deliveryDate,
              status,
              carrierRate,
            };
            return this.sqlShipment.save(prototypeShipment);
          })
    )
      .then((dataInserted) => {
        const msg = 'file inserted';
        return Promise.resolve(
          new ResponseOperation<{msg: string, total: number}>(true, HttpCode.CREATED, { msg, total: dataLength })
        );
      })
      .catch((err) => {
        return Promise.reject(
          new ResponseOperation<{msg: string, total: number}>(
            false,
            HttpCode.INTERNAL_ERROR,
            null,
            err
          )
        );
      });
  }

  private xlsxToJson(filePath: string, sheetName: string): any[] {
    const columnToKey = this.mappingColumns(sheetName);
    const excelData = excelToJson({
      sourceFile: filePath,
      sheets: [
        {
          name: sheetName,
          header: {
            rows: 1,
          },
          columnToKey,
        },
      ],
    });
    fs.unlinkSync(filePath);
    return excelData[sheetName];
  }

  private mappingColumns(sheetName: string): object {
    let columnToKey;
    if (sheetName === 'Carrier') {
      columnToKey = {
        A: 'scac',
        B: 'id',
        C: 'name',
        D: 'mc',
        E: 'dot',
        F: 'fein',
      };
    }
    if (sheetName === 'Data') {
      columnToKey = {
        A: 'carrierId',
        B: 'date',
        C: 'originCountry',
        D: 'originState',
        E: 'originCity',
        F: 'destinationCountry',
        G: 'destinationState',
        H: 'destinationCity',
        I: 'pickupdate',
        J: 'deliveryDate',
        K: 'status',
        L: 'carrierRate',
      };
    }
    return columnToKey;
  }
}
