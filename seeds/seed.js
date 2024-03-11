const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');
const { Recipe, Ingredient } = require('../models');
const seedDate = require("./dateData");
const recipeDataPath = path.join(__dirname, 'recipeData.json');
const recipesFromFile = JSON.parse(fs.readFileSync(recipeDataPath, 'utf8'));
const seedDate = require('./dateData')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    for (const recipeData of recipesFromFile) {
        const { name, servingSize, Ingredients } = recipeData;
        const recipe = await Recipe.create({ name, servingSize });

        for (const ingredientData of Ingredients) {
            const { name, amount, unit } = ingredientData;
            const ingredient = await Ingredient.create({ name, amount, unit });
            await recipe.addIngredient(ingredient);
        }
    }
    console.log('\n----- RECIPES & INGREDIENTS SEEDED -----\n');

    await seedDate();
    console.log('\n----- DATES SEEDED -----\n');

    process.exit(0);
};


seedDatabase();