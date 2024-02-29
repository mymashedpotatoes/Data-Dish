const { Router } = require("express");
const express = require("express");
const {Recipe, Ingredient} = require("../db");

const router = express.Router();

//route to create a new recipe
Router.post("./recipe", async (req, res) => {
    const {name, Ingredients} = req.body;

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
routes.get("/recipes", async (req, res) => {
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
            were:{ name },
            include: Ingredient
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
        const recipe =await recipe.findOne({ where: {name} });

        if (!recipe) {
            return res.status(404).send("Recipe not found");
        }

        const ingredients = await Ingredient.findAll({where: {recipeId: recipe.id} });
        res.json(ingredients);
    }catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving ingredients");
    }
});

module.exports = router;