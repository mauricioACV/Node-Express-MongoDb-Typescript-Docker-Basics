import express, { Application, Request, Response, NextFunction } from 'express';
import "dotenv/config";
import bodyParser from 'body-parser';
import Routes from './Routes';
import connect from './dbConfig';

const app: Application = express();
const PORT = process.env.PORT;
const db = "mongodb://mongo:27017/type-basics";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connect({ db });
Routes({ app });

app.get('/', (req: Request, res: Response) => {
    res.send('TS app is running!...');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});