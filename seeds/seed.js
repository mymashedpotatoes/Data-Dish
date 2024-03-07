const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');
const { Recipe, Ingredient } = require('../models');

const recipeDataPath = path.join(__dirname, 'recipeData.json');
const recipesFromFile = JSON.parse(fs.readFileSync(recipeDataPath, 'utf8'));

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    for (const recipeData of recipesFromFile) {
        const { name, servingSize, Ingredients } = recipeData;
        const recipe = await Recipe.create({ name, servingSize });

        for (const ingredientData of Ingredients) {
            const { name, amount } = ingredientData;
            const ingredient = await Ingredient.create({ name, amount });
            await recipe.addIngredient(ingredient);
        }
    }

    process.exit(0);
};

seedDatabase();