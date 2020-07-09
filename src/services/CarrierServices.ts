import CarrierController from '../controllers/CarrierController';
import {
  ICarrier,
  ICarrierController,
} from '../interfaces/CarrierInterfaces';
import ResponseOperation from '../helpers/ResponseOperation';
import { HttpCode } from '../helpers/HttpCodes';
import { Request, Response } from 'express';
import { authentication, authorize } from '../helpers/AuthenticationFunction';

export default class CarrierServices {
  public static routes(app: any) {
    app.post('/api/demo/carrier', authentication, authorize('admin'), (req: Request, res: Response) => {
      try {
        return this.create(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<ICarrier>(
            false,
            HttpCode.BAD_REQUEST,
            null,
            { message }
          )
        );
      }
    });

    app.get('/api/demo/carrier/:id?', authentication, (req: Request, res: Response) => {
      try {
        if (req.params.id) return this.getById(req, res);
        else return this.getAll(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<ICarrier[]>(
            false,
            HttpCode.BAD_REQUEST,
            null,
            { message }
          )
        );
      }
    });

    app.put('/api/demo/carrier/:id', authentication, authorize('admin'), (req: Request, res: Response) => {
      try {
        return this.update(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<ICarrier>(
            false,
            HttpCode.BAD_REQUEST,
            null,
            { message }
          )
        );
      }
    });

    app.delete('/api/demo/carrier/:id', authentication, authorize('admin'), (req: Request, res: Response) => {
      try {
        return this.delete(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<ICarrier>(
            false,
            HttpCode.BAD_REQUEST,
            null,
            { message }
          )
        );
      }
    });
  }

  private static create(req: Request, res: Response) {
    const carrierController: ICarrierController = new CarrierController();
    const carrier: ICarrier = {
      scac: req.body.scac,
      id: req.body.id,
      name: req.body.name,
      mc: req.body.mc,
      dot: req.body.dot,
      fein: req.body.fein,
    };
    carrierController
      .createCarrier(carrier)
      .then((result) => this.response(res, result))
      .catch((err) => {
        console.log(err);
        this.response(res, err);
      });
  }

  private static getAll(req: Request, res: Response) {
    const carrierController: ICarrierController = new CarrierController();
    carrierController
      .getCarriers()
      .then((result) => this.response(res, result))
      .catch((err) => this.response(res, err));
  }

  private static getById(req: Request, res: Response) {
    const carrierController: ICarrierController = new CarrierController();
    const { id } = req.params;
    carrierController
      .getCarrierById(id)
      .then((result) => this.response(res, result))
      .catch((err) => this.response(res, err));
  }

  private static update(req: Request, res: Response) {
    const carrierController: ICarrierController = new CarrierController();
    const carrier: ICarrier = {
      scac: req.body.scac,
      name: req.body.name,
      mc: req.body.mc,
      dot: req.body.dot,
      fein: req.body.fein,
    };
    const { id } = req.params;
    carrierController
      .updateCarrier(id, carrier)
      .then((result) => this.response(res, result))
      .catch((err) => {
        console.log(err);
        this.response(res, err);
      });
  }

  private static delete(req: Request, res: Response) {
    const carrierController: ICarrierController = new CarrierController();
    const { id } = req.params;
    carrierController
      .deleteCarrier(id)
      .then((result) => this.response(res, result))
      .catch((err) => this.response(res, err));
  }

  public static response(res: Response, result: ResponseOperation<any>) {
    res.status(result.statusCode).json(result);
  }
}
