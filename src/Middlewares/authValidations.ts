import User from '../Models/User.models';
import Role from '../Models/Role.models';
import { Request, Response, NextFunction } from 'express';
import config from '../config/keyConfig';
const jwt = require("jsonwebtoken");

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) return res.status(401).send({ status: "FAILED", data: { error: "Token is required" } });

        const decoded = jwt.verify(token, config.SECRET);
        const user = await User.findById(decoded.userid, { password: 0 });

        if (!user) return res.status(404).send({ status: "FAILED", data: { error: "User Not Found" } });

        req.userid = decoded.userid;
        next();

    } catch (error: any) {
        res
            .status(error.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

export const validateIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userid);
    const roles = await Role.find({ _id: { $in: user?.roles } });
    const isAdmin = roles.some(role => role.name === 'admin');
    if (isAdmin) next();
    return res.status(401).send({ status: "UNAUTHORIZED", data: { error: "different user role is required" } });
}