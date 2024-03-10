const router = require('express').Router();
const shoppingCartRoutes = require('./shoppingCartRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');
const mealRoutes = require('./mealRoutes');
const recipeRoutes = require('./recipeRoutes');

router.use('/recipe-routes', recipeRoutes);
router.use('/shopping-cart', shoppingCartRoutes);
router.use('/users', userRoutes);
router.use('/meals', mealRoutes);
router.use('/recipe', mealRoutes);

module.exports = router;