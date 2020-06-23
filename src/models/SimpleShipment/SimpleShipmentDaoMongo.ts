import { SimpleShipmentDao } from './SimpleShipmentDao';
import { ISimpleShipment } from '../../interfaces/SimpleShipmetInterfaces';
import mongodb, { Db, MongoError } from 'mongodb';
import MongoDB from '../DBs/MongoDB';

export default class SimpleShipmentDaoMongo implements SimpleShipmentDao {
  public async save(t: ISimpleShipment): Promise<ISimpleShipment> {
    return MongoDB.getConnection()
      .then((db: Db) => {
        const collection = db.collection('simpleShipments');
        return collection.insertOne(t);
      })
      .then((result) => {
        return Promise.resolve(result.ops[0]);
      })
      .catch((err: MongoError) => {
        return Promise.reject(err);
      });
  }

  public async getAll(): Promise<ISimpleShipment[]> {
    return MongoDB.getConnection()
      .then((db: Db) => {
        const collection = db.collection('simpleShipments');
        return collection.find({}).toArray();
      })
      .then((documents: ISimpleShipment[]) => {
        return Promise.resolve(documents);
      })
      .catch((err: MongoError) => {
        return Promise.reject(err);
      });
  }

  public async get(id: string): Promise<ISimpleShipment> {
    return MongoDB.getConnection()
      .then((db: Db) => {
        const items = db.collection('simpleShipments');
        return items.findOne({ _id: new mongodb.ObjectID(id) });
      })
      .then((document: ISimpleShipment) => {
        if (document) return Promise.resolve(document);
        else {
          const message = 'No document matching id: ' + id + ' could be found!';
          return Promise.reject(message);
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  public async update(
    t: ISimpleShipment,
    id: string
  ): Promise<ISimpleShipment> {
    return MongoDB.getConnection()
      .then((db: Db) => {
        const collection = db.collection('simpleShipments');
        return collection.findOneAndUpdate(
          { _id: new mongodb.ObjectID(id) },
          { $set: t },
          { returnOriginal: false }
        );
      })
      .then((result: any) => {
        return Promise.resolve(result.value);
      })
      .catch((err: MongoDB) => {
        return Promise.reject(err);
      });
  }

  public async delete(id: string): Promise<ISimpleShipment> {
    return MongoDB.getConnection()
      .then((db: Db) => {
        const collection = db.collection('simpleShipments');
        return collection.findOneAndDelete({ _id: new mongodb.ObjectID(id) });
      })
      .then((result: any) => {
        return Promise.resolve(result.value);
      })
      .catch((err: MongoDB) => {
        return Promise.reject(err);
      });
  }
}
