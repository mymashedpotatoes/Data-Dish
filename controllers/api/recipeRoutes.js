const router = require('express').Router();
const { Recipe, Ingredient } = require("../../models");
const withAuth = require('../utils/auth')




// POST --http://localhost:3001/recipe
router.post("/newRecipe", withAuth, async (req, res) => {
    let { name, servingSize, Ingredients } = req.body;
    name = name.replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word

    try {
        const recipe = await Recipe.create({ name, servingSize });

        await Promise.all(Ingredients.map(async ingredient => {
            const { name, amount, units } = ingredient;
            await recipe.createIngredient({ name, amount, units });
        }));

        res.send("Recipe created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating recipe");
    }
});



//  GET -- http://localhost:3001/recipe
router.get("/recipe", withAuth, async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        const recipeNames = recipes.map(recipe => ({
            name: recipe.name,
            servingSize: recipe.servingSize
        }));
        res.render("recipes", { recipes: recipeNames });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving recipes");
    }
});



// Route to delete a recipe and its associated ingredients

// DELETE --http://localhost:3001/recipe/Beef and Rice
router.delete("/:name",  withAuth, async (req, res) => {
    const { name } = req.params;

    try {
        // Find the recipe by name
        const recipe = await Recipe.findOne({
            where: { name },
            include: {
                model: Ingredient,
                attributes: ["name", "amount", "unit"]
            }
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

// update product
router.put('/:name',  withAuth, async (req, res) => {
    // update product data
    try {
        await Recipe.update(
            {
                activeRecipe: true,
            },
            {
                where: {
                    name: req.params.name,
                },
            }
        )
        console.log("updated");
        res.send("Recipe updated successfully");
    } catch (err) {
        console.error("Error updating recipe:", err);
        res.status(500).send("Error updating recipe");
    }
});


module.exports = router;