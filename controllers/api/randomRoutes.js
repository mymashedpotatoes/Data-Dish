const { ShoppingCartItem, ShoppingCart, Recipe } = require("../../models");
const express = require("express");
const withAuth = require("../../utils/auth");
const router = express.Router();

// Route to add items from random recipe to grocery list
router.post("/add-items", withAuth, async (req, res) => {
    try {
        const { items } = req.body;

        if (!Array.isArray(items)) {
            return res.status(400).json({ message: "Items should be provided as an array" });
        }

        let cart = await ShoppingCart.findOne();
        if (!cart) {
            cart = await ShoppingCart.create({ name: "Default Cart" });
        }

        for (const ingredient of items) {
            const { name, amount, unit } = ingredient;
            await ShoppingCartItem.create({ name, amount: amount.toString(), unit });
        }


        res.status(201).json({ message: "Items added to shopping cart" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding items to shopping cart");
    }
});

//route to add random recipe to recipe list
router.post("/newRecipe", withAuth, async (req, res) => {
    let { name, servingSize, Ingredients } = req.body;

    try {
        const recipe = await Recipe.create({ name, servingSize });

        await Promise.all(Ingredients.map(async ingredient => {
            const { name, amount, unit } = ingredient;
            await recipe.createIngredient({ name, amount, unit });
        }));

        res.status(201).json({ message: "Recipe created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating recipe");
    }
});

module.exports = router;