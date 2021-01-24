/* This is the endpoint with backend functions.

  Functions Included:
  1. upload(app, db);
      - Upload an image into project directory.
      - This is to be used with addReport function so you can add record to DB.
      - Perhaps you can merged the function with addReport
  2. findAllReport(app, db);
      - Fetch all reports existing on the databse.
  3. findReport(app, db);
      - Fetch a specific report by using the unique id.
  4. addReport(app, db);
      - Add a report to the db.
  5. editReport(app, db);
      - Update the report detail by using the unique id.
  6. deleteReport(app, db);
      - Remove a specific report by using the unique id.
*/
class Router {

  constructor(app, db) {
    this.upload(app, db);
    this.findAllReport(app, db);
    this.findReport(app, db);
    this.addReport(app, db);
    this.editReport(app, db);
    this.deleteReport(app, db);
  }

  // check acceptable file type;
  checkFileType(type) {
    const acceptFileTypes = ['image/jpeg', 'image/png', 'image/svg'];
    for (var i = 0; i < acceptFileTypes.length; i++) {
      if(type === acceptFileTypes) {
        return true;
      }
    }
    return false;
  }

  // Upload Endpoint
  upload(app, db) {
    
    app.post('/upload', (req, res) => {
      if (req.files === null) {
          return res.status(400).json({
            success: false,
            msg: 'No file was uploaded'
          });
      }

      const file = req.files.file;

      // console.log(file);
      // Reject file type not equal to specfic type. Return unsuccessful
      if(!this.checkFileType(file.mimetype)) {
        return res.status(400).json({
          success: false,
          msg: 'File type not accepted'
        });
      }

      // Kind of moving the file to server directory.
      file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
          if(err) {
              console.error(err);
              return res.status(500).send(err);
          }
          
          res.status(200).json({
            success: true,
            fileName: file.name, 
            filePath: `/uploads/${file.name}` 
          });
      });
    });
  }

  // Fetch exist reports from DB.
  findAllReport(app, db) {
    app.post('/findAllReport', (req, res) => {
      db.query('SELECT * FROM item_record ORDER BY id ASC', (err, data) => {
        // If an error occured.
        if(err) {
          res.status(err.status).json({
            success: false,
            msg: 'An error occured, please try again'
          });
          return;
        }
        // If any record is found on the databse.
        if(data && data.rows.length > 0) { 
          res.status(200).json({
              success: true,
              data: data.rows // Returns whole data object in row.
          });
          return true;
        }
        // No record is found on the database. return 404 not found.
        else {
          res.status(404).json({
            success: false,
            msg: 'Nothing found on the db.'
          });
        }
      });
    });
  }

  // Fetch an exist reports from DB with id.
  findReport(app, db) {
    app.post('/findReport', (req, res) => {
      let id = req.body.id;
      db.query('SELECT * FROM item_record WHERE id = $1 LIMIT 1', [id], (err, data) => {
        // If an error occured.
        if(err) {
          res.status(err.status).json({
            success: false,
            msg: 'An error occured, please try again'
          });
          return;
        }
        // If a record is found on the databse with the id. Return 200
        if(data && data.rows.length === 1) { 
          res.status(200).json({
            success: true,
            id: data.rows[0].id,
            option: data.rows[0].option,
            timestamp: data.rows[0].timestamp,
            description: data.rows[0].description,
            contact: data.rows[0].contact
          });
          return true;
        }
        // No record is found with the id. Return 404
        else {
          res.status(404).json({
            success: false,
            msg: `Nothing found with the id: ${id}.`
          });
        }
      });
    });
  }

  // Add new report to DB.
  addReport(app, db) {
    app.post('/addReport', (req, res) => {
      let option = req.body.option;
      let timestamp = req.body.timestamp;
      let description = req.body.description;
      let contact = req.body.contact;

      db.query('INSERT INTO item_record (option, timestamp, description, contact) VALUES ($1, $2, $3, $4)', 
      [option, timestamp, description, contact], (err, data) => {
        // If an error occured.
        if(err) {
          res.status(err.status).json({
            success: false,
            msg: 'An error occured, please try again'
          });
          return;
        }
        // If there is no error. Return 200 OK.
        res.status(200).json({
          success: true,
          id: data.insertId,
          msg: `Report added with ID: ${data.insertId}`
        });
      });
    });
  }

  // Update exist report in DB.
  editReport(app, db) {
    app.post('/editReport', (req, res) => {
      let id = req.body.id;
      let option = req.body.option;
      let timestamp = req.body.timestamp;
      let description = req.body.description;
      let contact = req.body.contact;

      db.query('UPDATE item_record SET (option = $1, timestamp = $2, description = $3, contact = $4) WHERE id = $5', 
      [option, timestamp, description, contact, id], (err, data, field) => {
        // If an error occured. Return error with code
        if(err) {
          res.status(err.status).json({
            success: false,
            msg: 'An error occured, please try again'
          });
          return;
        }
        // If there is no error. Return 200 OK.
        res.status(200).json({
          success: true,
          msg: `User modified with ID: ${id}`
        });
      });
    });
  }

  // Delete exist report in DB.
  deleteReport(app, db) {
    app.post('/deleteReport', (req, res) => {
      let id = req.body.id;
      db.query('DELETE FROM item_record WHERE id = $1', [id], (err, data, field) => {
        // If there is an error.
        if(err) {
          res.status(err.status).json({
            success: false,
            msg: 'An error occured, please try again'
          })
          return;
        }
        // If there is no error. Return 200 OK.
        res.status(200).json({
          success: true,
          msg: `User deleted with ID: ${id}`
        });
      });
    });
  }
}

module.exports = Router;