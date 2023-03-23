require('dotenv').config();
import http from 'http';
import app from './server/index';
import { PORT } from './constant/index';


const server = http.createServer(app);



 

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);


