import ShipmentController from '../controllers/ShipmentController';
import {
  IShipment,
  IShipmentController,
} from '../interfaces/ShipmentInterfaces';
import ResponseOperation from '../helpers/ResponseOperation';
import { HttpCode } from '../helpers/HttpCodes';
import { Request, Response } from 'express';
import { authentication, authorize } from '../helpers/AuthenticationFunction';

export default class ShipmentServices {
  public static routes(app: any) {
    app.post('/api/demo/shipment', authentication, authorize('admin'), (req: Request, res: Response) => {
      try {
        return this.create(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<IShipment>(
            false,
            HttpCode.BAD_REQUEST,
            null,
            { message }
          )
        );
      }
    });

    app.get('/api/demo/shipment/:id?', authentication, (req: Request, res: Response) => {
      try {
        if (req.params.id) return this.getById(req, res);
        else return this.getAll(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<IShipment[]>(
            false,
            HttpCode.BAD_REQUEST,
            null,
            { message }
          )
        );
      }
    });

    app.put('/api/demo/shipment/:id', authentication, authorize('admin'), (req: Request, res: Response) => {
      try {
        return this.update(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<IShipment>(
            false,
            HttpCode.BAD_REQUEST,
            null,
            { message }
          )
        );
      }
    });

    app.delete('/api/demo/shipment/:id', authentication, authorize('admin'), (req: Request, res: Response) => {
      try {
        return this.delete(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<IShipment>(
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
    const shipmentController: IShipmentController = new ShipmentController();
    const shipment: IShipment = {
      carrierId: req.body.carrierId,
      date: req.body.date,
      originCountry: req.body.originCountry,
      originState: req.body.originState,
      originCity: req.body.originCity,
      destinationCountry: req.body.destinationCountry,
      destinationState: req.body.destinationState,
      destinationCity: req.body.destinationCity,
      pickupdate: req.body.pickupdate,
      deliveryDate: req.body.deliveryDate,
      status: req.body.status,
      carrierRate: req.body.carrierRate,
    };
    shipmentController
      .createShipment(shipment)
      .then((result) => this.response(res, result))
      .catch((err) => {
        console.log(err);
        this.response(res, err);
      });
  }

  private static getAll(req: Request, res: Response) {
    const shipmentController: IShipmentController = new ShipmentController();
    const { q, date } = req.query;
    shipmentController
      .getShipments(q, date)
      .then((result) => this.response(res, result))
      .catch((err) => this.response(res, err));
  }

  private static getById(req: Request, res: Response) {
    const shipmentController: IShipmentController = new ShipmentController();
    const { id } = req.params;
    shipmentController
      .getShipmentById(id)
      .then((result) => this.response(res, result))
      .catch((err) => this.response(res, err));
  }

  private static update(req: Request, res: Response) {
    const shipmentController: IShipmentController = new ShipmentController();
    const shipment: IShipment = {
      carrierId: req.body.carrierId,
      date: req.body.date,
      originCountry: req.body.originCountry,
      originState: req.body.originState,
      originCity: req.body.originCity,
      destinationCountry: req.body.destinationCountry,
      destinationState: req.body.destinationState,
      destinationCity: req.body.destinationCity,
      pickupdate: req.body.pickupdate,
      deliveryDate: req.body.deliveryDate,
      status: req.body.status,
      carrierRate: req.body.carrierRate,
    };
    const { id } = req.params;
    shipmentController
      .updateShipment(id, shipment)
      .then((result) => this.response(res, result))
      .catch((err) => {
        console.log(err);
        this.response(res, err);
      });
  }

  private static delete(req: Request, res: Response) {
    const shipmentController: IShipmentController = new ShipmentController();
    const { id } = req.params;
    shipmentController
      .deleteShipment(id)
      .then((result) => this.response(res, result))
      .catch((err) => this.response(res, err));
  }

  public static response(res: Response, result: ResponseOperation<any>) {
    res.status(result.statusCode).json(result);
  }
}
