const router = require('express').Router();
const { Personnel, Movie } = require("../db");

// Route to get all personnel
router.get('/', async (req, res, next) => {
  try {
    // Find all personnel and include associated movies
    const personnel = await Personnel.findAll({
      include: Movie
    })
    // Send back the found personnel as JSON
    res.json(personnel)
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

module.exports = router;
