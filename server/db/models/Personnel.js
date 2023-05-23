// Importing the Sequelize module and database instance
const Sequelize = require('sequelize');
const db = require('../_db');

// Defining the Personnel model
const Personnel = db.define('personnel', {
 fName: {
 type: Sequelize.STRING,
 allowNull: false,
 },
 lName: {
 type: Sequelize.STRING,
 allowNull: false,
 },
 type: {
 // Enum values for the type field
 type: Sequelize.ENUM('Actor', 'Director'),
 allowNull: false,
 },
 imageUrl: {
 type: Sequelize.STRING,
 },
 details: {
 type: Sequelize.TEXT,
 allowNull: false,
 defaultValue: 'No bio yet.',
 },
});

// Exporting the Personnel model
module.exports = Personnel;
