import { Request, Response } from 'express';
import { RoutesInput } from '../Types/types';
import { IUser } from './../Models/User.models';
import UserController from '../Controllers/User.controller';

export default ({ app }: RoutesInput) => {
    app.post('/api/users', async (req: Request, res: Response) => {
        const user: IUser = await UserController.createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        });

        return res.send({ user });
    });
};