const router = require('express').Router();
const shoppingCartRoutes = require('./shoppingCartRoutes');
const userRoutes = require('./userRoutes');


router.use('/shopping-cart', shoppingCartRoutes);
router.use('/users', userRoutes);

module.exports = router;