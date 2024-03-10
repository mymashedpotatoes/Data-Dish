const router = require('express').Router();
const { Meal } = require('../../models');

// Add Meal to Current Monday
router.post('/monday', async (req, res) => {
    try {
      const dbMealData = await Meal.create({
        meal_name: req.body.meal_name,
        meal_date: req.body.meal_date,
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;