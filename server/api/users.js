const router = require('express').Router();
const { User } = require("../db");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware to require a JSON Web Token for certain routes
const requireToken = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;
    // Find the user associated with the token
    const user = await User.byToken(token);
    // Attach the user to the request object
    req.user = user;
    // Call the next middleware function
    next();
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
}

// Route to authenticate a user and send back a JSON Web Token
router.post('/auth', async (req, res, next) => {
  try {
    res.json({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error)
  }
})

// Route to get information about the currently authenticated user
router.get('/auth', requireToken, async (req, res, next) => {
  try {
    res.json(req.user)
  } catch (error) {
    next(error)
  }
})

// Route to get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // include: [ Order ]
    })
    res.json(users)
  }
  catch (error) {
    next(error)
  }
})

// Route to get a specific user by their ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      // include: [ Order ]
    })
    res.json(user)
  }
  catch (error) {
    next(error)
  }
})

// Route to create a new user
router.post('/', async (req, res, next) => {
  try {
    const addUser = await User.create(req.body);
    res.json(addUser)
  }
  catch (error) {
    next(error)
  }
})

// Route to update a specific user by their ID
router.put('/:id', async (req, res, next) => {
  try {
    const updateUser = await User.findByPk(req.params.id);
    const updated = await updateUser.update(req.body)
    res.send(updated)
  }
  catch (error) {
    next(error)
  }
})

// Route to delete a specific user by their ID
router.delete('/:id', async (req, res, next) => {
  try {
    const userId = Number(req.params.id)
    const deleteUser = await User.findByPk(userId);
    await deleteUser.destroy();
    res.sendStatus(204);
  }
  catch (error) {
    next(error)
  }
})

module.exports = router;
