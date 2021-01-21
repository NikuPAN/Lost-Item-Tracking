const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
// const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// Router.js is the endpoint API with every backend functions.
const Router = require('./Router');
const port = 5000;

app.use(fileUpload());

// Database
// const db = mysql.createConnection({
//     host: 'socif-eta-db-master.eastasia.cloudapp.azure.com',
//     user: 'pt',
//     password: 'socif123',
//     database: 'Inf'
// });

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pt',
  host: 'socif-eta-db-master.eastasia.cloudapp.azure.com',
  database: 'Inf',
  password: 'socif123',
  port: 5432,
})

// db.connect(function(err) {
//     if(err) {
//         console.log('Error Establishing Connection to DB');
//         throw err;
//         //return false;
//     }
// });

// const sessionStore = new MySQLStore({
//     expiration: (1825 * 86400 * 1000),  // 5 years
//     endCoonectionOnClose: false
// }, db);

// app.use(session({
//     key: 'ffjnsgwnocnoVR09U42U5M82JCJIORJ2093U',
//     secret: 'mseafij293293u3j29921U*(#@&@Y$#&@Y$114514',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: (1825 * 86400 * 1000),  // 5 years
//         httpOnly: false
//     }
// }));

new Router(app, pool);

app.listen(port, () => console.log('Server Started...(Port:'+port+')'));