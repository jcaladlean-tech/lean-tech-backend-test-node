import express from 'express';
import bodyParser from 'body-parser';

// routes
import HelloWorldServices from './services/HelloWorldServices';
import SimpleShipmentServices from './services/SimpleShipmentServices';
import EIAAPIServices from './services/EIAAPIServices';
import CarrierServices from './services/CarrierServices';
import ShipmentServices from './services/ShipmentServices';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.addServices();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private addServices(): void {
    HelloWorldServices.routes(this.app);
    SimpleShipmentServices.routes(this.app);
    EIAAPIServices.routes(this.app);
    CarrierServices.routes(this.app);
    ShipmentServices.routes(this.app);
  }
}

export default new App().app;
