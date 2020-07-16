import { IShipment } from '../../interfaces/ShipmentInterfaces';
import { Client } from 'pg';
import PosgreSqlDB from '../DBs/PosgreSqlDB';

export default class ShipmentPostgreSql {
  public async save(shipment: IShipment): Promise<IShipment> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text:
            'INSERT INTO shipment(carrierId, date, originCountry, originState, originCity, destinationCountry, destinationState, destinationCity, pickupdate, deliveryDate, status, carrierRate) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
          values: Object.values(shipment),
        };
        return connection.query(query);
      })
      .then((res: any) => {
        return Promise.resolve(res.rows[0]);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  public async getAll(q: string, date: string): Promise<IShipment[]> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = !q
          ? { text: 'SELECT * FROM shipment' }
          : {
              text: 'SELECT * FROM shipment WHERE originCountry = $1 OR  originState = $1 OR  originCity = $1 OR destinationCountry = $1 OR destinationState = $1 OR destinationCity = $1 OR status = $1',
              values: [q],
            };
        return connection.query(query);
      })
      .then((res: any) => {
        return Promise.resolve(res.rows);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  public async get(id: string): Promise<IShipment> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text: 'SELECT * FROM shipment WHERE id = $1',
          values: [id],
        };
        return connection.query(query);
      })
      .then((res: any) => {
        return Promise.resolve(res.rows);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  public async update(shipment: IShipment, id: string): Promise<IShipment> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text:
            'UPDATE shipment SET carrierId = $1, date = $2, originCountry = $3, originState = $4, originCity = $5, destinationCountry = $6, destinationState = $7, destinationCity = $8, pickupdate = $9, deliveryDate = $10, status = $11, carrierRate = $12 WHERE id = $13 RETURNING *',
          values: [...Object.values(shipment), id],
        };
        return connection.query(query);
      })
      .then((res: any) => {
        return Promise.resolve(res.rows);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  public async delete(id: string): Promise<IShipment> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text: 'DELETE FROM shipment WHERE id = $1 RETURNING *',
          values: [id],
        };
        return connection.query(query);
      })
      .then((res: any) => {
        return Promise.resolve(res.rows);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  public async getExportData(): Promise<any> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text: 'SELECT carrier.name, carrier.scac, shipment.pickupdate, shipment.deliveryDate , shipment.status, shipment.originCity, COUNT(shipment.carrierRate) AS countOrders, AVG(shipment.carrierRate) AS averageCarrierRate, SUM(shipment.carrierRate) AS totalCarrierRate FROM shipment INNER JOIN carrier ON shipment.carrierId = carrier.id GROUP BY carrier.id, shipment.pickupdate, shipment.deliveryDate, shipment.status, shipment.originCity ORDER BY carrier.id',
        };
        return connection.query(query);
      })
      .then((res: any) => {
        return Promise.resolve(res.rows);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}
