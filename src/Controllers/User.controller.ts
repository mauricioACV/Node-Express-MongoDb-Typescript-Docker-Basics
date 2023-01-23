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
        .then((data: IUser) => data)
        .catch((err: Error) => { throw err });
};

async function getUsers(): Promise<IUser[]> {
    return User.find()
        .then((data: IUser[]) => data)
        .catch((err: Error) => { throw err })
};

async function getUserById(id: string) {
    return User.findById(id)
        .then((data) => data)
        .catch((err: Error) => { throw err })
};

async function uptadeUserById(id: string, user: IUser) {
    return User.findByIdAndUpdate(id, user, { new: true })
        .then((data) => data)
        .catch((err: Error) => { throw err })
}

async function deleteUserById(id: string) {
    return User.findByIdAndDelete(id)
        .then((data) => data)
        .catch((err: Error) => { throw err })
}   

export default {
    createUser,
    getUsers,
    getUserById,
    uptadeUserById,
    deleteUserById,
};