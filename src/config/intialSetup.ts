import Role from '../Models/Role.models';

export const createRoles = async () => {
    try {
        const count: number = await Role.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'admin' }).save(),
        ]);

        console.log(values);
        
    } catch (error) {
        console.error(error);
    }
}