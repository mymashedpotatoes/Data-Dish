
const express = require("express");
const {Recipe, Ingredient} = require("../models");

const router = express.Router();

//route to create a new recipe
router.post("/recipe", async (req, res) => {
    let { name, Ingredients } = req.body;
    name = name.replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word

    try {
        const recipe = await Recipe.create({ name });
        await Promise.all(Ingredients.map(ingredient => recipe.createIngredient({name: ingredient})));

        res.send("Recipe created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating recipe");
    }
});


//route to get all recipes (only names)
router.get("/recipe", async (req, res) => {
    try {
        const recipes =await Recipe.findAll();
        const recipeNames = recipes.map(recipe => recipe.name);
        res.json(recipeNames);
    }catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving recipes");
    }
});


//Route to get a specific recipe by name with its ingredients
router.get("/recipe/:name", async (req, res) => {
    const { name } = req.params;

    try {
        const recipe = await Recipe.findOne({
            where:{ name },
            include: {
                model: Ingredient,
                attributes: ['id', 'name']
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclude createdAt and updatedAt fields
        });
        if (!recipe) {
            return res.status(404).send("Recipe not found");
        }

        res.json(recipe);
    }catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving recipe");
    }
})


//route to get all ingredients for a specific recipe
router.get("/recipe/:name/ingredients", async (req,res) => {
    const { name } = req.params;

    try{
        const recipe =await Recipe.findOne({ where: {name} });

        if (!recipe) {
            return res.status(404).send("Recipe not found");
        }

        const ingredients = await Ingredient.findAll({ 
            where: { recipeId: recipe.id },
            attributes: ['id', 'name']
        });
        
        res.json(ingredients);
    }catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving ingredients");
    }
});


// Route to delete a recipe and its associated ingredients
router.delete("/recipe/:name", async (req, res) => {
    const { name } = req.params;

    try {
        // Find the recipe by name
        const recipe = await Recipe.findOne({
            where: { name },
            include: Ingredient
        });

        // If recipe not found, return 404
        if (!recipe) {
            return res.status(404).send("Recipe not found");
        }

        // Delete the recipe and its associated ingredients
        await recipe.destroy();

        res.send("Recipe deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting recipe");
    }
});

module.exports = router;