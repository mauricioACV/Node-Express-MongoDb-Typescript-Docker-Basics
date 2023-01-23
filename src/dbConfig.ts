import mongoose, { mongo } from 'mongoose';

type DBInput = {
    db: string;
}

export default ({ db }: DBInput) => {
    const connect = () => {
        mongoose
            .set('strictQuery', false)
            .connect(db, {})
            .then(() => {
                return console.info(`Successfully connected to ${db}`);
            })
            .catch((err) => {
                console.error(`Error connecting to database: ${err}`);
                return process.exit(1);
            });
    };
    connect();
    mongoose.connection.on('disconnected', connect);
};
