import { ICarrier } from '../../interfaces/CarrierInterfaces';
import { Client } from 'pg';
import PosgreSqlDB from '../DBs/PosgreSqlDB';

export default class CarrierPostgreSql {
  public async save(carrier: ICarrier): Promise<ICarrier> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text:
            'INSERT INTO carrier(scac, id, name, mc, dot, fein) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET scac = excluded.scac, name = excluded.name, mc = excluded.mc, dot = excluded.dot, fein = excluded.fein RETURNING *',
            values: Object.values(carrier),
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

  public async getAll(): Promise<ICarrier[]> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = 'SELECT * FROM carrier';
        return connection.query(query);
      })
      .then((res: any) => {
        return Promise.resolve(res.rows);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  public async get(id: string): Promise<ICarrier> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text: 'SELECT * FROM carrier WHERE id = $1',
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

  public async update(carrier: ICarrier, id: string): Promise<ICarrier> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text:
            'UPDATE carrier SET scac = $1, name = $2, mc = $3, dot = $4, fein = $5 WHERE id = $6 RETURNING *',
          values: [...Object.values(carrier), id],
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

  public async delete(id: string): Promise<ICarrier> {
    return PosgreSqlDB.getConnection()
      .then((connection: Client) => {
        const query = {
          text: 'DELETE FROM carrier WHERE id = $1 RETURNING *',
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
