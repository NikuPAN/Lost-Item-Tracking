const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const app = express();
// const path = require('path');

// Router.js is the endpoint API with every backend functions.
const Router = require('./Router');
const port = 5000;

// app.use(express.static(path.join(__dirname, 'client', 'public')));
// app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// app.get('/', (req, res) => {
//   res.json({ info: 'Node.js, Express, and Postgres API' })
// });

// app.post('/upload', Router.upload);
// app.post('/addReport', Router.addReport);
// app.get('/findAllReport', Router.findAllReport);
// app.get('/findReport/:id', Router.findReport);
// app.put('/editReport/:id', Router.editReport);
// app.delete('/deleteReport/:id', Router.deleteReport);

// Database
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pt',
  host: 'socif-eta-db-master.eastasia.cloudapp.azure.com',
  database: 'lnf', // L not I..............
  password: 'socif123',
  port: 5432,
});

// Test connection
// pool.query('SELECT * FROM item_record ORDER BY id ASC', (err, data) => {
//   // If an error occured.
//   if(err) {
//     throw err;
//   }
//   // If any record is found on the databse.
//   if(data && data.rows.length > 0) { 
//     console.log(data.rows);
//   }
//   // No record is found on the database. return 404 not found.
//   else {
//     console.log("Nothing found on server.");
//   }
// });

new Router(app, pool);

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'))
// });

app.listen(port, () => console.log('Server Started...(Port: '+port+')'));