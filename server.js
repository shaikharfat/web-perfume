
// Import the express and url modules
const express = require("express");
const url = require("url");

// Status codes defined in external file
require("./http_status.js");  

// The express module is a function. When it is executed it returns an app object
const app = express();

// Import the mysql module
const mysql = require("mysql2");

// Create a connection object with the user details
const connectionPool = mysql.createPool({
  connectionLimit: 1,
  host: "bk5sdfgeloohxrleivml-mysql.services.clever-cloud.com",
  user: "ukglmkakwvt3ahhu",
  password: "sxR4X7yEur4emZaDYYkk",
  database: "bk5sdfgeloohxrleivml",
  debug: false
});

// Serve up static pages from site root directory
app.use(express.static("./"));

// Start the app listening on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT);


/**
 * Sanitize query string to avoid SQL injection.
 */


/** 
 * Handles GET requests sent to web service. 
 * Processes path and query string and calls appropriate functions to return the data.
 */


const handlegetFragrance = (request, response) => {
  connectionPool.query("SELECT * FROM `complete_set` WHERE rank_3_seller IS NOT NULL AND rank_3_seller <> ''  ", (err, result) => {
    if (err) {
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      response.json({ "error": true, "message": +err });
    } else {
      response.json(result);
    }
  });
};


const handlegetbrand = (req, res) => {
  // Validate brandName if necessary...
  const brand = req.query.id;
  let sqlPerfumeInBrand = "SELECT * FROM complete_set WHERE brand='" + brand + "'";
  connectionPool.query(sqlPerfumeInBrand, (err, result) => {
    if (err) {
      // Not an ideal error code, but we don't know what has gone wrong.
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      res.json({ "error": true, "message": + err });
      return;
    } else {
      res.json(result);
    }
  });
}

const handlegetAllbrands=(req,res)=>{
  const query = 'SELECT DISTINCT Brand FROM complete_set';

  connectionPool.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: true, message: err.message });
    } else {
      const brands = result.map((row) => row.Brand);
      res.json(brands);
    }
  });
}

const handleGetPerfumeByName=(req, res)=>{
  const perfName = req.query.name;

  const query = "SELECT * FROM complete_set WHERE name = '" + perfName + "'";
  
  connectionPool.query(query, (err, result) => {
    if (err) {
      // Not an ideal error code, but we don't know what has gone wrong.
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      res.json({ "error": true, "message": + err });
      return;
    } else {
      res.json(result);
    }
  });
}
// Set up the application to handle GET requests sent to the user path
// app.get("/cars-data", handleGetRequest);
// app.get("/car-brands", handleGetRequest);
// app.get("/car-models-in-brand", handleGetRequest);
app.get("/fragrances", handlegetFragrance);
app.get('/brands', handlegetAllbrands)
app.get("/brand", handlegetbrand);
app.get("/getPerfumebySearch", handleGetPerfumeByName);

