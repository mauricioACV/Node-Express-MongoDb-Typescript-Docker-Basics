import express, { Application, Request, Response } from 'express';
import connect from './config/dbConfig';
import "dotenv/config";
import { createRoles } from './config/intialSetup';
import fs = require('fs');
const swaggerUi = require("swagger-ui-express");

const cors = require('cors');
const UserRoutes_V1 = require('./Routes/v1/userRoutes');
const AuthRoutes_V1 = require('./Routes/v1/authRoutes');

const app: Application = express();
const PORT = process.env.PORT;

//****Dev****
const db = 'mongodb://localhost:27017/type-basics';
//****Prod****
// const db = 'mongodb://mongo:27017/type-basics';

connect({ db });
createRoles();

const whitelist = ['http://localhost:4444']
const corsOptions = {
    origin: function (origin: string, callback: any) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      console.log('origin:', origin, 'not allowed')
      callback(new Error('Not allowed by CORS'))
    }
  }
}

/* Swagger files start */
const swaggerFile: any = ("src/swagger/swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
/* Swagger files end */

app.use(express.json());
// app.use(cors(corsOptions));
app.use('/api/v1/users', UserRoutes_V1);
app.use('/api/v1/auth', AuthRoutes_V1);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, null, null, null));

app.get('/', (req: Request, res: Response) => {
    res.send('TS app is running!...');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});