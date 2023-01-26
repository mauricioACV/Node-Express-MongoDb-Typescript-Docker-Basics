import express from "express";
import { Request, Response } from 'express';
import User from '../Models/User.models';
import config from '../config/keyConfig';
const jwt = require("jsonwebtoken");

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
            const user = await User.findOne({ userName: req.body.username }).populate('roles');
            if (!user) return res.status(400).send({ status: "FAILED", data: { error: "User Not Found" } });
            const matchPassword = await User.comparePassword(req.body.password, user.password);
            const token = jwt.sign(
                {
                    userid: user._id,
                },
                config.SECRET,
                { expiresIn: "2h" }
            );
            if (!matchPassword) return res.status(401).send({ status: "FAILED", data: { error: "Invalid Password" } });
            return res.status(200).send({ status: "OK", data: user, token });
        } catch (error: any) {
            res
                .status(error.status || 500)
                .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    })

module.exports = router;
