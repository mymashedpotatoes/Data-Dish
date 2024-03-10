const router = require('express').Router();
const { Recipe, Ingredient, Day } = require('../models');
const withAuth = require('../utils/auth')


// Route to Homepage
router.get('/', withAuth, async (req, res) => {
  try {
    var curr = new Date;
    startDate = new Date(curr.getFullYear(), 0, 1);
let days = Math.floor((curr - startDate) /
    (24 * 60 * 60 * 1000));
 
let weekNumber = Math.ceil(days / 7);
    const dateData = await Day.findAll({
      where: {week: weekNumber}
    });
    const dates = dateData.map((days) => days.get({ plain: true }));

    const mealData = await Recipe.findAll({
      where: {activeRecipe: true}
    })
    const meals = mealData.map((meals) => meals.get({ plain: true }));

    res.render('homepage', {
      dates,
      meals,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Login Page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Route to New User Page
router.get('/newUser', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('newUser');
});

//route to get all recipes (only names)

//  GET -- http://localhost:3001/recipe
router.get("/recipe", async (req, res) => {
  try {
      const recipes =await Recipe.findAll();
      const recipeNames = recipes.map(recipe => ({
          name: recipe.name,
          servingSize: recipe.servingSize
      }));
      res.render("recipes", { recipes: recipeNames, logged_in: req.session.logged_in, });
  }catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving recipes");
  }
});

//route to newRecipe 
router.get('/new-recipe', (req, res) => {
  res.render('newRecipe'); 
});


//Route to get a specific recipe by name and its ingredients

// GET -- http://localhost:3001/recipe/Beef and Rice
router.get("/recipe/:name", async (req, res) => {
  const { name } = req.params;

  try {
      const recipe = await Recipe.findOne({
          where:{ name },
          include: {
              model: Ingredient,
              attributes: ['id', 'name', "amount", "unit"]
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclude createdAt and updatedAt fields
      });
      if (!recipe) {
          return res.status(404).send("Recipe not found");
      }

      res.render("recipeDetails", { recipe: recipe.toJSON() });

  }catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving recipe");
  }
})


//route to get all ingredients for a specific recipe

// GET --http://localhost:3001/recipe/Beef and Rice/ingredient
router.get("/recipe/:name/ingredient", async (req,res) => {
  const { name } = req.params;

  try{
      const recipe =await Recipe.findOne({ where: {name} });

      if (!recipe) {
          return res.status(404).send("Recipe not found");
      }

      const ingredients = await Ingredient.findAll({ 
          where: { recipeId: recipe.id },
          attributes: ['id', 'name', "amount", "unit"]
      });
      
      res.json(ingredients);
  }catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving ingredients");
  }
});

//route to get a ingredient by its name 

// GET -- http://localhost:3001/ingredient/milk
router.get("/ingredient/:name", async (req, res) =>{
  const {name} = req.params;
  try {
      const ingredient = await Ingredient.findOne({
          where: {name},
          attributes: ["id", "name", "amount", "unit"]
       });
      if (!ingredient) {
          return res.status(404).send("Ingredient not found");
      }

      res.json(ingredient);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving ingredient")
  }
})

//route to get random recipe page

//GET -- http://localhost:3001/apiRecipe
router.get('/apiRecipe', withAuth, (req, res) => {
  try {
      res.render('apiRecipe', {logged_in: req.session.logged_in});
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;