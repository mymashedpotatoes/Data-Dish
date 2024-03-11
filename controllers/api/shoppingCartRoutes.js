// Route to add an item to the shopping cart 
const { ShoppingCartItem, ShoppingCart } = require("../../models");
const express = require("express");
const withAuth = require("../../utils/auth");
const router = express.Router();

router.post("/add-item", withAuth,async (req, res) => {
    const { name, amount, unit } = req.body;

    try {
        let cart = await ShoppingCart.findOne();
        if (!cart) {
            cart = await ShoppingCart.create({ name: "Default Cart" }); // Create a default cart if none exists
        }
        // check if the item already exists in the shopping cart
        let existingItem = await ShoppingCartItem.findOne({where: {name} });

        if (existingItem) {
            //update the existing items amount by adding the new amount
            const newAmount = parseInt(existingItem.amount) + parseInt(amount);
            await existingItem.update({amount: newAmount.toString(), unit });

            //show success message with the updated item 
            return res.status(200).json({message: "Item amount updated in shopping cart", updatedItem: existingItem })
        }
        // Create a new shopping cart item
        const newItem = await ShoppingCartItem.create({ name, amount, unit });

        // Return success response
        res.status(201).json({ message: "Item added to shopping cart", newItem });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding item to shopping cart");
    }
});

// Route to get all items in the shopping cart
router.get("/items", withAuth, async (req, res) => {
    try {
        // Find all items in the shopping cart
        const items = await ShoppingCartItem.findAll();
        console.log(items);
        
        // Return the items as a JSON response
        res.render("shoppingCart", { items, logged_in: req.session.logged_in });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching items from shopping cart");
    }
});


// Route to delete an item from the shopping cart
router.delete("/:name", withAuth, async (req, res) => {
    const { name } = req.params;

    try {
        // Find the item in the shopping cart
        const item = await ShoppingCartItem.findOne({ where: { name } });
        if (!item) {
            return res.status(404).send("Item not found in the shopping cart");
        }

        // Delete the item
        await item.destroy();

        // Return success message
        res.status(200).json({ message: "Item deleted from the shopping cart" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting item from the shopping cart");
    }
});

module.exports = router;