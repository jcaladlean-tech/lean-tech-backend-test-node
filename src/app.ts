import express from 'express';
import bodyParser from 'body-parser';

// routes
import HelloWorldServices from './services/HelloWorldServices';
import SimpleShipmentServices from './services/SimpleShipmentServices';

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
  }
}

export default new App().app;
