import mongodb, { Db, MongoClient } from 'mongodb';
import { config } from '../../config';

export default class MongoDB {
  private static mongodbClient: MongoClient = null;
  private static db: Db = null;

  private constructor() {}

  public static async getConnection() {
    if (this.mongodbClient === null) this.db = await MongoDB.dbConnect();
    return this.db;
  }

  private static async dbConnect(): Promise<Db> {
    return mongodb.MongoClient.connect(config.mongoDataBase.URL, {
      useUnifiedTopology: true,
    })
      .then((client: MongoClient) => {
        this.mongodbClient = client;
        const db = this.mongodbClient.db('test');
        // Make sure connection closes when Node exits
        process.on('exit', (code) => this.dbClose());
        return Promise.resolve(db);
      })
      .catch((err: MongoDB) => {
        return Promise.reject(err);
      });
  }

  public static async dbClose() {
    if (this.mongodbClient && this.mongodbClient.isConnected()) {
      await this.mongodbClient.close();
    }
  }
}
