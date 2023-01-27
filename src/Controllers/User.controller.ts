import User, { IUser } from '../Models/User.models';
import { Request, Response } from 'express';
import Role from '../Models/Role.models';
import { getJwtToken } from '../Utils/jwt.util';

const createUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { roles } = body;
    try {
        const newUser = new User({
            firstName: body.firstname,
            lastName: body.lastname,
            userName: body.username,
            email: body.email,
            password: await User.encryptPassword(body.password),
        });

        if (roles.toString() !== "") {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({ name: 'user' });
            newUser.roles = [role?._id];
        }

        const createdUser = await newUser.save();
        const userJwtSignObj =             {
            userid: createdUser._id,
            email: createdUser.email,
        };

        const token = getJwtToken(userJwtSignObj);
        return res.status(201).send({ status: "CREATED", data: createdUser, token });

    } catch (error: any) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find();
        return res.send({ status: "OK", data: users });
    } catch (error: any) {
        res
            .status(error.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getUserById = async (req: Request, res: Response) => {
    const {
        params: { userid },
    } = req;

    try {
        const user = await User.findById(userid);
        return res.send({ status: "OK", data: user });
    } catch (error: any) {
        res
            .status(error.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const uptadeUserById = async (req: Request, res: Response) => {
    const {
        body,
        params: { userid },
    } = req;

    try {
        const updatedUser = await User.findByIdAndUpdate(userid, body, { new: true });
        return res.status(200).send({ status: "OK", data: updatedUser });
    } catch (error: any) {
        res
            .status(error.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const deleteUserById = async (req: Request, res: Response) => {
    const {
        params: { userid },
    } = req;

    try {
        await User.findByIdAndDelete(userid);
        return res.status(204).send({ status: "OK" });
    } catch (error: any) {
        res
            .status(error.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

export default {
    createUser,
    getUsers,
    getUserById,
    uptadeUserById,
    deleteUserById,
};