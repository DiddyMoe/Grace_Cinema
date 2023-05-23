const router = require('express').Router();
const { User } = require('../db');

// Route to handle user login
router.post('/login', async (req, res, next) => {
  try {
    // Authenticate the user and send back a JSON Web Token
    res.json({ token: await User.authenticate(req.body) });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
});

// Route to handle user signup
router.post('/signup', async (req, res, next) => {
  try {
    // Create a new user in the database
    const user = await User.create(req.body);
    // Send back a JSON Web Token for the new user
    res.json({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      // If the email is already in use, send an error message
      res.status(401).send('User already exists');
    } else {
      // Pass any other errors to the error handling middleware
      next(err);
    }
  }
});

// Route to get information about the currently logged in user
router.get('/me', async (req, res, next) => {
  try {
    // Find the user by their JSON Web Token and send back their information
    res.json(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    // Pass any errors to the error handling middleware
    next(ex);
  }
});

module.exports = router;
