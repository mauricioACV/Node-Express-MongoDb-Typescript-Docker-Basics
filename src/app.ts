import express, { Application, Request, Response, NextFunction } from 'express';
import "dotenv/config";
import connect from './dbConfig';

const UserRoutes = require('./Routes/userRoutes');

const app: Application = express();
const PORT = process.env.PORT;

//****Dev****
// const db = 'mongodb://localhost:27017/type-basics';
//****Prod****
const db = 'mongodb://mongo:27017/type-basics';

app.use(express.json());
app.use('/api/users', UserRoutes);
connect({ db });

app.get('/', (req: Request, res: Response) => {
    res.send('TS app is running!...');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});