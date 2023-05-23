const router = require('express').Router();
const { Order, Movie } = require("../db");

// Route to get all orders
router.get('/', async (req, res, next) => {
  try {
    // Find all orders and include associated movies
    const orders = await Order.findAll({
      include: [{ model: Movie, as: 'movies'}]
    })
    // Send back the found orders as JSON
    res.send(orders)
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

// Route to get a specific order by its ID
router.get('/:id', async (req, res, next) => {
  try {
    // Find the order by its primary key and include associated movies
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: Movie, as: 'movies'}]
    })
    // Send back the found order as JSON
    res.send(order)
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

// Route to create a new order
router.post('/', async (req, res, next) => {
  try {
    // Create a new order in the database with the data from the request body
    const addOrder = await Order.create(req.body);
    // Send back the created order as JSON
    res.send(addOrder)
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

// Route to update a specific order by its ID
router.put('/:id', async (req, res, next) => {
  try {
    // Find the order by its primary key
    const updateOrder = await Order.findByPk(req.params.id);
    // Update the order with the data from the request body
    const updated = await updateOrder.update(req.body)
    // Send back the updated order as JSON
    res.send(updated)
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

// Route to delete a specific order by its ID
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    // Find the order by its primary key
    const deleteOrder = await Order.findByPk(id);
    // Delete the order from the database
    await deleteOrder.destroy();
    // Send back a success status code
    res.sendStatus(204);
  }
  catch (error) {
    // Pass any errors to the error handling middleware
    next(error)
  }
})

module.exports = router;
