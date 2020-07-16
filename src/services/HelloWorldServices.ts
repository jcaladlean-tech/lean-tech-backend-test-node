import { Request, Response } from 'express';
import fs from 'fs';

export default class HelloWorldServices {
  public static routes(app: any) {
    app.get('/', (req: Request, res: Response) => {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      fs.readFile('src/htmlTemplate/index.html', null, function (error, data) {
        if (error) {
          res.writeHead(404);
          res.write('Whoops! File not found!');
        } else {
          res.write(data);
        }
        res.end();
      });
      // res.status(200).sendFile('src/htmlTemplate/index.html');
    });

    app.get('/holamundo/txt', (req: Request, res: Response) => {
      res.status(200).send('Hello World!');
    });

    app.get('/holamundo/json', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Hello world' });
    });
  }
}
