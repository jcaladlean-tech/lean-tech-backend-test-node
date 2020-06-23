import { Client } from 'pg';
import { config } from '../../config';

export default class PosgreSqlDB {
  private static client: Client = null;

  private constructor() {}

  public static async getConnection() {
    if (this.client === null) await PosgreSqlDB.dbConnection();
    return this.client;
  }

  private static async dbConnection(): Promise<any> {
    this.client = new Client({
      user: config.postgresqlDataBase.user,
      host: config.postgresqlDataBase.host,
      database: config.postgresqlDataBase.dataBase,
      password: config.postgresqlDataBase.password,
      port: parseInt(config.postgresqlDataBase.port, 10),
    });
    return await this.client.connect()
  }
}
