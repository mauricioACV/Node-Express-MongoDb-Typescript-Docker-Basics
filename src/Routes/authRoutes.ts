import express from "express";
import { Request, Response } from 'express';
import { IUser } from '../Models/User.models';
import UserController from '../Controllers/User.controller';

const router = express.Router();

router
    .post('/signup', async (req: Request, res: Response) => {
        try {

        } catch (error: any) {
            res
                .status(error.status || 500)
                .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    })
    .post('/signin', async (req: Request, res: Response) => {
        try {

        } catch (error: any) {
            res
                .status(error.status || 500)
                .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    })


module.exports = router;
