

// sends all ingredients to the shopping cart 
const addAllToCart = async (ingredients) => {
    try {
        // Add each ingredient to the cart
        await Promise.all(ingredients.map(async (ingredient) => {
            const response = await fetch("/shopping-cart/add-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: ingredient.name,
                    amount: ingredient.amount
                })
            });
            if (!response.ok) {
                throw new Error("Failed to add item to shopping cart");
            }
        }));

        // Display success message on the screen
        const successMessage = document.createElement('div');
        successMessage.textContent = "Items added to shopping cart successfully";
        document.body.appendChild(successMessage);

    } catch (error) {
        console.error(error);
        return { error: "Failed to add item to shopping cart" };
    }
}

const deleteItem = async (itemName) => {
    try {
        const response = await fetch(`/shopping-cart/${itemName}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to delete item from shopping cart");
        }
        const data = await response.json();
        displayMessage(data.message);

    } catch (error) {
        console.error(error);
        displayMessage("Failed to delete item from shopping cart");
    }
}

const displayMessage = (message) => {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
}

document.getElementById("deleteForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const itemsToDelete = formData.getAll("item");
    await Promise.all(itemsToDelete.map(async (itemName) => {
        await deleteItem(itemName);
    }));
    form.reset();
    window.location.reload(true); // Refresh the page
});

module.exports = {addAllToCart};