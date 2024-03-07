
const express = require("express");
const {Recipe, Ingredient} = require("../../models");
const router = express.Router();


// POST --http://localhost:3001/recipe
router.post("/recipe", async (req, res) => {
    let { name,servingSize, Ingredients } = req.body;
    name = name.replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word

    try {
        const recipe = await Recipe.create({ name, servingSize });

        await Promise.all(Ingredients.map(async ingredient => {
            const { name, amount } = ingredient;
            await recipe.createIngredient({ name, amount });
        }));

        res.send("Recipe created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating recipe");
    }
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
        res.json(recipeNames);
    }catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving recipes");
    }
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
                attributes: ['id', 'name', "amount"]
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
            attributes: ['id', 'name', "amount"]
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
            attributes: ["id", "name", "amount"]
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


// Route to delete a recipe and its associated ingredients

// DELETE --http://localhost:3001/recipe/Beef and Rice
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