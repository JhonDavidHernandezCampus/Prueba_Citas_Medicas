import dotenv from 'dotenv';
import express  from 'express';
import Routes from './routes/routes.js';
import conx from './config/db.js';
dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(express.text());

appExpress.use('/', Routes)


let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});
