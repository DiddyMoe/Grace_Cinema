// Importing the database instance and models
const db = require('./_db');
const User = require('./models/User');
const Order = require('./models/Order');
const Movie = require('./models/Movie');
const Personnel = require('./models/Personnel');

// Defining many-to-many relationships between Personnel and Movie models
Personnel.belongsToMany(Movie, {through: 'Movie_Personnel'});
Movie.belongsToMany(Personnel, {through: 'Movie_Personnel'});

// Defining one-to-many relationship between User and Order models
User.hasMany(Order);
Order.belongsTo(User);

// Defining many-to-many relationship between Order and Movie models
Order.belongsToMany(Movie, {through: 'Order_Movie'});
Movie.belongsToMany(Order, {through: 'Order_Movie'});

// Exporting the database instance and models
module.exports = {
 db,
 User,
 Order,
 Movie,
 Personnel,
}
