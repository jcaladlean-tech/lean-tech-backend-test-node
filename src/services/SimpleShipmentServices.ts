import SimpleShipmentController from '../controllers/SimpleShipmentController';
import {
  ISimpleShipment,
  ISimpleShipmentController,
} from '../interfaces/SimpleShipmetInterfaces';
import ResponseOperation from '../helpers/ResponseOperation';
import { HttpCode } from '../helpers/HttpCodes';
import { Request, Response } from 'express';

export default class SimpleShipmentServices {
  public static routes(app: any) {
    app.post('/api/nosql/shipment', (req: Request, res: Response) => {
      try {
        return this.create(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<ISimpleShipment>(
            false,
            HttpCode.BAD_REQUEST,
            null,
            { message }
          )
        );
      }
    });

    app.get('/api/nosql/shipment/:id?', (req: Request, res: Response) => {
      try {
        if (req.params.id) return this.getById(req, res);
        else return this.getAll(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<ISimpleShipment[]>(
            false,
            HttpCode.BAD_REQUEST,
            null,
            { message }
          )
        );
      }
    });

    app.put('/api/nosql/shipment/:id', (req: Request, res: Response) => {
      try {
        return this.update(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<ISimpleShipment>(
            false,
            HttpCode.BAD_REQUEST,
            null,
            { message }
          )
        );
      }
    });

    app.delete('/api/nosql/shipment/:id', (req: Request, res: Response) => {
      try {
        return this.delete(req, res);
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<ISimpleShipment>(
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
    const simpleShipmentController: ISimpleShipmentController = new SimpleShipmentController(
      'mongo'
    );
    const shipment: ISimpleShipment = {
      quoteRefId: req.body.quoteRefId,
      from: req.body.from,
      to: req.body.to,
      products: req.body.products,
      accessorials: req.body.accessorials,
      instructionsShipper: req.body.instructionsShipper,
      instructionsConsignee: req.body.instructionsConsignee,
      references: req.body.references,
    };
    simpleShipmentController
      .createSimpleShipment(shipment)
      .then((result) => this.response(res, result))
      .catch((err) => {
        console.log(err);
        this.response(res, err);
      });
  }

  private static getAll(req: Request, res: Response) {
    const simpleShipmentController: ISimpleShipmentController = new SimpleShipmentController(
      'mongo'
    );
    simpleShipmentController
      .getSimpleShipments()
      .then((result) => this.response(res, result))
      .catch((err) => this.response(res, err));
  }

  private static getById(req: Request, res: Response) {
    const simpleShipmentController: ISimpleShipmentController = new SimpleShipmentController(
      'mongo'
    );
    const { id } = req.params;
    simpleShipmentController
      .getSimpleShipmentById(id)
      .then((result) => this.response(res, result))
      .catch((err) => this.response(res, err));
  }

  private static update(req: Request, res: Response) {
    const simpleShipmentController: ISimpleShipmentController = new SimpleShipmentController(
      'mongo'
    );
    const shipment: ISimpleShipment = {
      quoteRefId: req.body.quoteRefId,
      from: req.body.from,
      to: req.body.to,
      products: req.body.products,
      accessorials: req.body.accessorials,
      instructionsShipper: req.body.instructionsShipper,
      instructionsConsignee: req.body.instructionsConsignee,
      references: req.body.references,
    };
    const { id } = req.params;
    simpleShipmentController
      .updateSimpleShipment(id, shipment)
      .then((result) => this.response(res, result))
      .catch((err) => {
        console.log(err);
        this.response(res, err);
      });
  }

  private static delete(req: Request, res: Response) {
    const simpleShipmentController: ISimpleShipmentController = new SimpleShipmentController(
      'mongo'
    );
    const { id } = req.params;
    simpleShipmentController
      .deleteSimpleShipment(id)
      .then((result) => this.response(res, result))
      .catch((err) => this.response(res, err));
  }

  public static response(res: Response, result: ResponseOperation<any>) {
    res.status(result.statusCode).json(result);
  }
}
