import { Request, Response } from 'express';

export default class HelloWorldServices {
  public static routes(app: any) {
    app.get('/holamundo/txt', (req: Request, res: Response) => {
      res.status(200).send('Hello World!');
    });

    app.get('/holamundo/json', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Hello world' });
    });
  }
}
