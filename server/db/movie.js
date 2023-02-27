const Sequelize = require('sequelize');
const db = require('./_db');

const Movie = db.define('movie', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    genre: {
        type: Sequelize.ENUM('Action/Adventure', 'Biography/Historical', 'Comedy', 'Documentary', 'Drama', 'Family/Animated', 'Fantasy', 'Horror/Thriller', 'Romance', 'Science Fiction', 'Western'),
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1888
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: .01
      }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowNull: false,
		validate:{
			isUrl: true
		}
	}
});

module.exports = Movie;