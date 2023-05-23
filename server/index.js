// Importing required modules
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const jwt = require("jsonwebtoken");

// Creating an instance of express app
const app = express();

// Exporting the app instance
module.exports = app;

// Using cors middleware to enable cross-origin resource sharing
app.use(cors());

// Using morgan middleware for logging HTTP requests
app.use(morgan('dev'));

// Using body parsing middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using static file-serving middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, "..", "public")));

// Using routes for API and authentication
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

// Middleware to catch any URLs resembling a file extension and send a 404 response
app.use((req, res, next) => {
 if (path.extname(req.path).length > 0) {
 res.status(404).end();
 } else {
 next();
 }
});

// Error catching endware to log errors and send appropriate response
app.use((err, req, res, next) => {
 console.error(err);
 console.error(err.stack);
 res.status(err.status || 500).send(err.message || "Internal server error.");
});