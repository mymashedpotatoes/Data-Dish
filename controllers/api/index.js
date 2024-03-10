const router = require('express').Router();

const userRoutes = require('./userRoutes');
const shoppingRoutes = require ('./shoppingCartRoutes');
const recipeRoutes = require ('./recipeRoutes');

router.use('/users', userRoutes);
router.use('/shopping-cart', shoppingRoutes);
router.use('/recipe', recipeRoutes);

module.exports = router;