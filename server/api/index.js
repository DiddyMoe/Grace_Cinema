const router = require('express').Router()

// Mount the personnel routes on the /personnel path
router.use('/personnel', require('./personnel'));

// Mount the movies routes on the /movies path
router.use('/movies', require('./movies'));

// Mount the users routes on the /users path
router.use('/users', require('./users'));

// Mount the orders routes on the /orders path
router.use('/orders', require('./orders'));

// Add additional model routes here as you create them!

module.exports = router;
