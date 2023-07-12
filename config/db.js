import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

let config = JSON.parse(process.env.MY_CONNECT);

const my_credentials = {
    host: config.host, 
    user: config.user,
    password: config.password,
    database: config.database
}

const conx = mysql.createPool(my_credentials);

export default conx;