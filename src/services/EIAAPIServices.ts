import { Request, Response } from 'express';
import ResponseOperation from '../helpers/ResponseOperation';
import { HttpCode } from '../helpers/HttpCodes';
import EiaApi from '../helpers/EIAAPI';
import { ISimpleShipment } from '../interfaces/SimpleShipmetInterfaces';

export default class EIAAPIServices {
  public static routes(app: any) {
    app.get('/eia', (req: Request, res: Response) => {
      try {
        EiaApi().then((data) => {
          const [date, price] = data;
          return this.response(
            res,
            new ResponseOperation<any>(true, HttpCode.OK, { date, price })
          );
        });
      } catch (e) {
        const message = e;
        this.response(
          res,
          new ResponseOperation<any>(false, HttpCode.BAD_REQUEST, null, {
            message,
          })
        );
      }
    });
  }

  public static response(res: Response, result: ResponseOperation<any>) {
    res.status(result.statusCode).json(result);
  }
}
