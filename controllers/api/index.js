const router = require('express').Router();
const shoppingCartRoutes = require('./shoppingCartRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');

router.use('/recipe-routes', recipeRoutes);
router.use('/shopping-cart', shoppingCartRoutes);
router.use('/users', userRoutes);

module.exports = router;