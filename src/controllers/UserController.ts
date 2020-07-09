import User from '../models/User/UserMongo';
import { IUserController, IUser, IUserPrototype } from '../interfaces/UserInterfaces';
import ResponseOperation from '../helpers/ResponseOperation';
import { HttpCode } from '../helpers/HttpCodes';

export default class UserController implements IUserController {
  public async signIn(user: IUserPrototype): Promise<ResponseOperation<[IUser, string]>> {
    return User.find({ email: user.email })
      .exec()
      .then(async (oldUsers: IUser[]) => {
        if (oldUsers.length === 0) {
          return Promise.reject(
            new ResponseOperation<[IUser, string]>(false, HttpCode.BAD_REQUEST, null, { msg: 'The email is not registered.' })
          );
        }
        const oldUser: IUser = oldUsers[0];

        return oldUser
          .validatePassword(user.password)
          .then(async (valid: boolean) => {
            if (valid) {
              const token = await oldUser.generateAuthToken();
              oldUser.password = undefined;
              return Promise.resolve(
                new ResponseOperation<[IUser, string]>(true, HttpCode.OK, [oldUser, token,])
              );
            } else {
              return Promise.reject(
                new ResponseOperation<[IUser, string]>(false, HttpCode.BAD_REQUEST, null, { msg: 'Incorrect Password' })
              );
            }
          });
      });
  }

  public async signOut(user: IUserPrototype, token: string): Promise<ResponseOperation<IUser>> {
    return User.find({ email: user.email })
      .exec()
      .then(async (oldUsers: IUser[]) => {
        if (oldUsers.length === 0) {
          return Promise.reject(
            new ResponseOperation<[IUser, string]>(false, HttpCode.BAD_REQUEST, null, { msg: 'The email is not registered.' })
          );
        }
        const oldUser: IUser = oldUsers[0];

        return oldUser.removeAuthToken(token).then(() => {
          return Promise.resolve(
            new ResponseOperation<IUser>(true, HttpCode.OK, oldUser)
          );
        });
      })
      .catch((error: any) => {
        return Promise.reject(
          new ResponseOperation<IUser>(false, HttpCode.INTERNAL_ERROR, null, error)
        );
      });
  }

  public async createUser(user: IUserPrototype): Promise<ResponseOperation<[IUser, string]>> {
    const dataUser = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      role: user.role,
      status: true,
    };
    const recordedUser: IUser = new User(dataUser);
      return recordedUser
      .save()
      .then(async (newUser: IUser) => {
          const token = await recordedUser.generateAuthToken();
          newUser.password = undefined;
          return Promise.resolve(new ResponseOperation<[IUser, string]>(true, HttpCode.CREATED, [newUser, token,])
        );
      })
      .catch((error: any) => {
        return Promise.reject(
          new ResponseOperation<[IUser, string]>(false, HttpCode.INTERNAL_ERROR, null, error)
        );
      });
  }

  public async deleteUser(id: IUser['_id']): Promise<ResponseOperation<IUser>> {
    return null;
  }
}
