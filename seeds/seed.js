const sequelize = require('../config/connection');
const { Recipe, Ingredient } = require('../models');

const recipeData = require('./recipeData.json');
const ingredientData = require('./ingredientData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const recipes = await Recipe.bulkCreate(recipeData, {
    individualHooks: true,
    returning: true,
  });

  for (const ingredient of ingredientData) {
    await Ingredient.create({
      ...ingredient,
      recipe_id: recipes[Math.floor(Math.random() * recipes.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
