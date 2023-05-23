const router = require('express').Router();
const { Movie, Personnel } = require("../db");

// Route to get all movies
router.get('/', async (req, res, next) => {
  try {
    // Find all movies and include associated personnel
    const movies = await Movie.findAll({
      include: Personnel
    })
    // Send back the found movies as JSON
    res.json(movies)
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

// Route to get a specific movie by its ID
router.get('/:id', async (req, res, next) => {
  try {
    // Find the movie by its primary key and include associated personnel
    const movie = await Movie.findByPk(req.params.id, {
      include: [ Personnel ]
    })
    // Send back the found movie as JSON
    res.json(movie)
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

// Route to create a new movie
router.post('/', async (req, res, next) => {
  try {
    // Create a new movie in the database with the data from the request body
    const addMovie = await Movie.create(req.body);
    // Send back the created movie as JSON
    res.json(addMovie)
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

// Route to update a specific movie by its ID
router.put('/:id', async (req, res, next) => {
  try {
    // Find the movie by its primary key
    const updateMovie = await Movie.findByPk(req.params.id);
    // Update the movie with the data from the request body
    const updated = await updateMovie.update(req.body)
    // Send back the updated movie as JSON
    res.send(updated)
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

// Route to delete a specific movie by its ID
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    // Find the movie by its primary key
    const movieToDelete = await Movie.findByPk(id);
    // Delete the movie from the database
    await movieToDelete.destroy();
    // Send back a success status code
    res.sendStatus(202)
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

module.exports = router;
