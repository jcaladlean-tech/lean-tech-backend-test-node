import { Request, Response} from 'express';
import ResponseOperation from '../helpers/ResponseOperation';
import { IUser, IUserPrototype, IUserController } from '../interfaces/UserInterfaces';
import UserController from '../controllers/UserController';
import { HttpCode } from '../helpers/HttpCodes';
import { authentication } from '../helpers/AuthenticationFunction';

export default class UserServices {

    public static routes(app: any){
        app.post('/api/demo/signup', (req: Request, res: Response) => {
            try {
                this.create(req, res);
            } catch (e){
                return this.response(res, new ResponseOperation<IUser>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        });

        app.post('/api/demo/signin', (req: Request, res: Response) => {
            try {
                this.signin(req, res);
            } catch (e){
                return this.response(res, new ResponseOperation<IUser>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        });

        app.put('/api/demo/signout', authentication, (req: Request, res: Response) => {
            try {
                this.signout(req, res);
            } catch (e){
                return this.response(res, new ResponseOperation<IUser>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        });
    }

    private static create(req: Request, res: Response){
        const controller: IUserController = new UserController();

        const userData: IUserPrototype = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        }
        controller.createUser(userData)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static signin(req: Request, res: Response){
        const controller: IUserController = new UserController();

        const userData: IUserPrototype = {
            email: req.body.email,
            password: req.body.password
        }
        controller.signIn(userData)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static signout(req: any, res: Response){
        const controller: IUserController = new UserController();

        const userData: IUserPrototype = {
            email: req.user.email
        }
        controller.signOut(userData, req.token)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static response(res: Response, result: ResponseOperation<any>){
        res.status(result.statusCode).json(result);
    }


}