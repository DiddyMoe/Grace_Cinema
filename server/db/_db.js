// Importing the Sequelize module
const Sequelize = require('sequelize');

// Setting the configuration options for the database connection
const config = {
 logging: false,
};

// Enabling logging if the LOGGING environment variable is set
if (process.env.LOGGING) {
 delete config.logging;
}

// Setting SSL options if the DATABASE_URL environment variable is set
if (process.env.DATABASE_URL) {
 config.dialectOptions = {
 ssl: {
 rejectUnauthorized: false,
 },
 };
}

// Creating a new instance of Sequelize with the given database URL and configuration options
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/grace_cinema', config);

// Exporting the database instance
module.exports = db;
