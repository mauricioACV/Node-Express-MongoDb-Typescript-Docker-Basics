import Role from '../Models/Role.models';
import User from '../Models/User.models';


export const createRoles = async () => {
    try {
        const count: number = await Role.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'admin' }).save(),
        ]);

        const adminRolId = values.filter(rol => rol.name === "admin")[0]._id;

        const firstAdminUser = new User({
            firstName: "user",
            lastName: "admin",
            userName: "administrator",
            email: "admin@admin.com",
            password: await User.encryptPassword("1234"),
            roles: [`${adminRolId}`]
        });

        const createdAdminUser = await firstAdminUser.save();

        console.log(values);
        console.log(createdAdminUser);

    } catch (error) {
        console.error(error);
    }
}