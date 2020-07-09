import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from './config';

// routes
import HelloWorldServices from './services/HelloWorldServices';
import SimpleShipmentServices from './services/SimpleShipmentServices';
import EIAAPIServices from './services/EIAAPIServices';
import CarrierServices from './services/CarrierServices';
import ShipmentServices from './services/ShipmentServices';
import UserServices from './services/UserServices';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.addServices();
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongoDataBase.URL, config.mongoDataBase.options);
  }

  private addServices(): void {
    HelloWorldServices.routes(this.app);
    SimpleShipmentServices.routes(this.app);
    EIAAPIServices.routes(this.app);
    CarrierServices.routes(this.app);
    ShipmentServices.routes(this.app);
    UserServices.routes(this.app);
  }
}

export default new App().app;
