import express from "express";
import { Request, Response } from 'express';
import User from '../../Models/User.models';
import { getJwtToken } from '../../Utils/jwt.util';

const router = express.Router();

router
    .post('/signup', async (req: Request, res: Response) => {
        try {
            //redireccionar a page de registro usuario, la que utilizará ruta post crear usuario
            res.send('Registration page...');
        } catch (error: any) {
            res
                .status(error.status || 500)
                .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    })
    .post('/signin', async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ userName: req.body.username }).populate('roles');
            if (!user) return res.status(400).send({ status: "FAILED", data: { error: "User Not Found" } });
            const matchPassword = await User.comparePassword(req.body.password, user.password);
            const userJwtSignObj = { userid: user._id };
            const token = getJwtToken(userJwtSignObj);
            if (!matchPassword) return res.status(401).send({ status: "FAILED", data: { error: "Invalid Password" } });
            return res.status(200).send({ status: "OK", data: user, token });
        } catch (error: any) {
            res
                .status(error.status || 500)
                .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    })

module.exports = router;
