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

  // Upload Endpoint
  upload(app, db) {
    
    app.post('/upload', (req, res) => {
      if (req.files === null) {
          return res.status(400).json({
              msg: 'No file was uploaded'
          });
      }

      const file = req.files.file;

      file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
          if(err) {
              console.error(err);
              return res.status(500).send(err);
          }

          res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });
    });
  }

  // Fetch exist reports from DB.
  findAllReport(app, db) {
    app.post('/findAllReport', (req, res) => {
      db.query('SELECT * FROM item_record', (err, data, field) => {
        // If error occured.
        if(err) {
          res.json({
              success: false,
              msg: 'An error occured, please try again'
          });
          return;
        }
        // If any record is found on the databse.
        if(data && data.length > 0) { 
          res.json({
              success: true,
              data: data // Return whole data object.
          });
          return true;
        }
        // no record is found on the database.
        else {
          res.json({
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
      let id = req.body.id
      db.query('SELECT * FROM item_record WHERE id = ? LIMIT 1', id, (err, data, field) => {
        // If a record is found on the databse with the id.
        if(data && data.length === 1) { 
          res.json({
              success: true,
              id: data[0].id,
              option: data[0].option,
              timestamp: data[0].timestamp,
              description: data[0].description,
              contact: data[0].contact
          });
          return true;
        }
        // no record is found on the database with the id.
        else {
          res.json({
              success: false,
              msg: 'Nothing found on the db with the id.'
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

      db.query('INSERT INTO item_record (option, timestamp, description, contact) VALUES (?, ?, ?, ?)', 
      (option, timestamp, description, contact), (err, data, field) => {
        // If there is an error.
        if(err) {
          res.json({
              success: false,
              msg: 'An error occured, please try again'
          })
          return;
        }
        // If there is no error.
        res.json({
          success: true,
          msg: 'A record has successfully added into the databse!'
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

      db.query('UPDATE item_record SET (option = ?, timestamp = ?, description = ?, contact = ?) WHERE id = ?', 
      (option, timestamp, description, contact, id), (err, data, field) => {
        // If there is an error.
        if(err) {
          res.json({
              success: false,
              msg: 'An error occured, please try again'
          })
          return;
        }
        // If there is no error.
        res.json({
          success: true,
          msg: 'A record has been successfully updated!'
        });
      });
    });
  }

  // Delete exist report in DB.
  deleteReport(app, db) {
    app.post('/deleteReport', (req, res) => {
      let id = req.body.id;
      db.query('DELETE FROM item_record WHERE id = ?', id, (err, data, field) => {
        // If there is an error.
        if(err) {
          res.json({
              success: false,
              msg: 'An error occured, please try again'
          })
          return;
        }
        // If there is no error.
        res.json({
          success: true,
          msg: 'A record has been deleted successfully!'
        });
      });
    });
  }
}

module.exports = Router;