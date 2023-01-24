import express from "express";
const jwt = require("jsonwebtoken");
import { Request, Response } from 'express';
import { IUser } from '../Models/User.models';
import UserController from '../Controllers/User.controller';
import config from '../config/keyConfig';

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
            userName: req.body.username,
            email: req.body.email,
            pass: req.body.password,
        }
        try {
            const createdUser: IUser = await UserController.createUser(newUser);
            const token = jwt.sign(
                {
                  userId: createdUser._id,
                  email: createdUser.email,
                },
                config.SECRET,
                { expiresIn: "2h" }
              );
            return res.status(201).send({ status: "Created", data: createdUser, token });

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
            return res.status(200).send({ status: "OK", data: updatedUser });
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