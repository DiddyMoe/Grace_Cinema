const Sequelize = require('sequelize');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require('../_db');

// Define the User model
const User = db.define('user', {
  fName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  type: {
    type: Sequelize.ENUM('customer', 'Admin'),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  }
});

// Number of salt rounds for bcrypt
const SALT_ROUNDS = 5;

// Method to check if the entered password is correct
User.prototype.correctPassword = function(password) {
  // Compare the plain version to an encrypted version of the password
  return bcrypt.compare(password, this.password);
}

// Method to generate a JSON Web Token for the user
User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

// Static method to authenticate a user with email and password
User.authenticate = async function({ email, password }){
  const user = await this.findOne({where: { email }})
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

// Static method to find a user by their JSON Web Token
User.findByToken = async function(token) {
  try {
    const {id} = jwt.verify(token, process.env.JWT)
    const user = await User.findByPk(id)
    if (user) {
      return user
    }
    const error = Error('bad token')
    error.status = 401
  } catch (ex) {
    const error = Error('bad token')
    throw error
  }
}

// Hook to hash the user's password before creating or updating it in the database
const hashPassword = async(user) => {
  // In case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))

module.exports = User;
