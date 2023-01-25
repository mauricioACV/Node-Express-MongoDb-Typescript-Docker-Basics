import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    userName: string;
    roles: string[];
}

interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    userName: string;
    roles: string[];
}

interface UserModel extends Model<User> {
    encryptPassword(password: string): string;
    comparePassword(registeredPass: string, enteredPass: string): boolean;
}

const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        roles: [{
            ref: "Role",
            type: Schema.Types.ObjectId
        }]
    },
    {
        timestamps: true,
        versionKey: false
    });

UserSchema.static('encryptPassword', async (pass: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
});

UserSchema.static('comparePassword', async (registeredPass: string, enteredPass: string) => {
    return await bcrypt.compare(registeredPass, enteredPass);
})

const User = mongoose.model<User, UserModel>('User', UserSchema);
export default User