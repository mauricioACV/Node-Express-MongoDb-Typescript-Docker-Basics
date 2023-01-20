import User, { IUser } from '../Models/User.models';

interface ICreateUserInput {
    email: IUser['email'];
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
}

async function createUser({
    email,
    firstName,
    lastName
}: ICreateUserInput): Promise<IUser> {
    return User.create({
        email,
        firstName,
        lastName
    })
        .then((data: IUser) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
};

export default {
    createUser
};