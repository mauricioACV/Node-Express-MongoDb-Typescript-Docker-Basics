import express from "express";
import { Request, Response } from 'express';
import { IUser } from '../Models/User.models';
import UserController from '../Controllers/User.controller';

const router = express.Router();

router
    .get('/', async (req: Request, res: Response) => {
        try {
            const users: IUser[] = await UserController.getUsers();
            return res.send({ status: "OK", data: users });
        } catch (error: any) {
            res
                .status(error.status || 500)
                .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    })
    .get('/:userid', async (req: Request, res: Response) => {
        const {
            params: { userid },
        } = req;

        try {
            const user = await UserController.getUserById(userid);
            return res.send({ status: "OK", data: user });
        } catch (error: any) {
            res
                .status(error.status || 500)
                .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    })
    .post('/', async (req: Request, res: Response) => {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        }

        try {
            const createdUser: IUser = await UserController.createUser(newUser);
            return res.status(201).send({ status: "Created", data: createdUser });

        } catch (error: any) {
            res
                .status(error?.status || 500)
                .send({ status: "FAILDED", data: { error: error?.message || error } });
        }
    })
    .patch('/:userid', async (req: Request, res: Response) => {
        const {
            body,
            params: { userid },
        } = req;

        try {
            const updatedUser = await UserController.uptadeUserById(userid, body);
            return res.send({ status: "OK", data: updatedUser });
        } catch (error: any) {
            res
                .status(error.status || 500)
                .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    })
    .delete('/:userid', async (req: Request, res: Response) => {
        const {
            params: { userid },
        } = req;

        try {
            await UserController.deleteUserById(userid);
            return res.status(204).send({ status: "OK" });
        } catch (error: any) {
            res
                .status(error.status || 500)
                .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    })

module.exports = router;