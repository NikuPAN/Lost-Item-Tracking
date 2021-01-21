const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
// const path = require('path');
// const mysql = require('mysql');
// const session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session);

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

pool.query('SELECT * FROM item_record ORDER BY id ASC', (err, data) => {
    // If an error occured.
    if(err) {
      console.log(err);
      return;
    }
    // If any record is found on the databse.
    if(data && data.length > 0) { 
      console.log(data.rows);
    }
    // No record is found on the database. return 404 not found.
    else {
      console.log(data.rows);
    }
  });

new Router(app, pool);

app.listen(port, () => console.log('Server Started...(Port: '+port+')'));