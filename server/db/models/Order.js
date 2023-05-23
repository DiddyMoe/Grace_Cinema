// Importing the Sequelize module and database instance
const Sequelize = require('sequelize');
const db = require('../_db');

// Defining the Order model
const Order = db.define('order', {
 status: {
 // Enum values for the status field
 type: Sequelize.ENUM('In Cart', 'Bought'),
 allowNull: false,
 },
});

// Exporting the Order model
module.exports = Order;
