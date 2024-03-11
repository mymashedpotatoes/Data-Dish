const router = require('express').Router();
const shoppingCartRoutes = require('./shoppingCartRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');
const mealRoutes = require('./mealRoutes');

router.use('/shopping-cart', shoppingCartRoutes);
router.use('/users', userRoutes);
router.use('/meals', mealRoutes);
router.use('/recipe', recipeRoutes);

module.exports = router;