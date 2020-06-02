import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from './config';

// routes
import HelloWorldServices from './services/HelloWorldServices';

class App {
  public app: express.Application;
  public mongoUrl: string = config.dataBase.URL;

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.addServices();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, config.dataBase.options);
  }

  private addServices(): void {
    HelloWorldServices.routes(this.app);
  }
}

export default new App().app;
