import {Document} from 'mongoose';
import ResponseOperation from '../helpers/ResponseOperation';

export interface IUser extends Document {
    fullName?: string;
    email?: string;
    tokens?: string[],
    password?: string;
    role?: string;
    status?: boolean;

    generateAuthToken(): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
    removeAuthToken(token: string): Promise<IUser>;
}

export interface IUserPrototype {
    _id?: IUser['_id']
    fullName?: string;
    email?: string;
    tokens?: string[],
    password?: string;
    role?: string;
    status?: boolean;
}

export interface IUserController {
    signIn(user: IUserPrototype): Promise<ResponseOperation<[IUser, string]>>;
    signOut(user: IUserPrototype, token: string): Promise<ResponseOperation<IUser>>;
    createUser(user: IUserPrototype): Promise<ResponseOperation<[IUser, string]>>;
    deleteUser(id: string): Promise<ResponseOperation<IUser>>;
}
