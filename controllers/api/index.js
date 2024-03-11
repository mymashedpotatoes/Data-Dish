const router = require('express').Router();

const shoppingCartRoutes = require('./shoppingCartRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');
const mealRoutes = require('./mealRoutes');
const randomRoutes = require('./randomRoutes');

router.use('/recipe', recipeRoutes);
router.use('/shopping-cart', shoppingCartRoutes);
router.use('/users', userRoutes);
router.use('/meals', mealRoutes);
router.use('/random', randomRoutes);

module.exports = router;