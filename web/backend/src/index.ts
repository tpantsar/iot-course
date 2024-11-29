import Express from 'express'
import { configDotenv } from "dotenv";
configDotenv();
import cors from 'cors';
import mongoose from 'mongoose';

import sensors from './routes/sensors';


const PORT = process.env.PORT || 8001;
const app = Express();

mongoose.connect(process.env.MONGODB_URI)
    .catch(error => console.log('error in mongodb connect(): ', error))
    .then(() => console.log('connected to mongodb'));

// App-wide settings
app.use(Express.json());
app.disable('x-powered-by');
app.use(cors())

// Attach routers from their respective modules
app.use('/sensors', sensors);

app.get('/', (req, res) => {
    res.json({data: 'Server is up!'});
})

// Not found
app.use((req, res, next) => {
    res.status(404).json({error: 'Not found'});
})

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
