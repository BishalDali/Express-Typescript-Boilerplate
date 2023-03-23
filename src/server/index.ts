import bodyParser from 'body-parser';
import express, {Express, Router} from 'express';
import morgan from 'morgan';
import { MONGO_URL } from '../constant/index';
import { dbConnect } from '../database/index';
import path from 'path';
import cors from 'cors';
import Routes from '../routes/index.route';

const app : Express = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

const staticPath = path.join(__dirname,'..', '..','..') + '/Public';


// Database Connection
if(MONGO_URL){
    dbConnect(MONGO_URL);
}else{
    console.log("Database URL not found");
}


// Routes
app.get('/', (req, res) => {
    res.sendFile(
        path.join(staticPath, 'welcome.html')
    );
});

app.use('/api', Routes);



export default app;
