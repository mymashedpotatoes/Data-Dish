const router = require('express').Router();

const userRoutes = require('./userRoutes');
const mealRoutes = require('./mealRoutes');
const recipeRoutes = require('./recipeRoutes');

router.use('/users', userRoutes);
router.use('/meals', mealRoutes);
router.use('/recipe', mealRoutes);

module.exports = router;