import { SimpleShipmentDao } from './SimpleShipmentDao';
import { ISimpleShipment } from '../../interfaces/SimpleShipmetInterfaces';
import { Client } from 'pg';
import PosgreSqlDB from '../DBs/PosgreSqlDB';

export default class SimpleShipmentDaoPostgreSql implements SimpleShipmentDao {
  public async save(t: ISimpleShipment): Promise<ISimpleShipment> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text:
            'INSERT INTO simpleShipment(quoteRefId, "from", "to", products, accessorials, instructionsShipper, instructionsConsignee, "references") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
          values: Object.values(t),
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

  public async getAll(): Promise<ISimpleShipment[]> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const text = 'SELECT * FROM simpleShipment';
        return connection.query(text);
      })
      .then((res: any) => {
        return Promise.resolve(res.rows);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  public async get(id: string): Promise<ISimpleShipment> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text: 'SELECT * FROM simpleShipment WHERE _id = $1',
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

  public async update(t: ISimpleShipment, id: string): Promise<ISimpleShipment> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text:
            'UPDATE simpleShipment SET quoteRefId = $1, "from" = $2, "to" = $3, products = $4, accessorials = $5, instructionsShipper = $6, instructionsConsignee = $7, "references" = $8 WHERE _id = $9 RETURNING *',
          values: [...Object.values(t), id],
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

  public async delete(id: string): Promise<ISimpleShipment> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text: 'DELETE FROM simpleShipment WHERE _id = $1 RETURNING *',
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
}
