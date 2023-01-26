import express, { Application, Request, Response } from 'express';
import connect from './config/dbConfig';
import "dotenv/config";
import { createRoles } from './config/intialSetup';

const cors = require('cors');
const jwt =  require('jsonwebtoken');
const UserRoutes = require('./Routes/userRoutes');
const AuthRoutes = require('./Routes/authRoutes');

const app: Application = express();
createRoles();
const PORT = process.env.PORT;

//****Dev****
const db = 'mongodb://localhost:27017/type-basics';
//****Prod****
// const db = 'mongodb://mongo:27017/type-basics';

connect({ db });

const whitelist = ['http://localhost:3000']
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

app.use(express.json());
// app.use(cors(corsOptions));
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('TS app is running!...');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});