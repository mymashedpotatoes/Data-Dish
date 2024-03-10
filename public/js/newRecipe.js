function addIngredientField() {
    const ingredients = document.getElementById("ingredients");
    const newIngredientDiv = document.createElement("div");
    newIngredientDiv.classList.add("ingredient");
    newIngredientDiv.innerHTML = `
        <input type="text" name="ingredients[]" placeholder="Ingredient" required>
        <input type="text" name="amount[]" placeholder="Amount" required>
        <select name="units[]">
            <option value="G">G</option>
            <option value="KG">KG</option>
            <option value="ML">ML</option>
            <option value="L">L</option>
            <option value="TSP">TSP</option>
            <option value="TBSP">TBSP</option>
            <option value="CUP">CUP</option>
            <option value="OZ">OZ</option>
            <option value="LB">LB</option>
            <option value="EACH">EACH</option>
        </select>
        <button type="button" onclick="removeIngredientField(this)">Remove</button>
    `;
    ingredients.appendChild(newIngredientDiv);
}


function removeIngredientField(button) {
    const ingredientDiv = button.parentElement;
    ingredientDiv.remove();
}
document.getElementById("newRecipeForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const ingredients = [];
    
    formData.getAll("ingredients[]").forEach((ingredient, index) => {
        ingredients.push({
            name: ingredient,
            amount: formData.getAll("amount[]")[index], 
            unit: formData.getAll("units[]")[index]
        });
    });

    const recipeData = {
        name: formData.get("recipeName"),
        servingSize: formData.get("servingSize"),
        Ingredients: ingredients
    };

    console.log("Form Data:", formData);
    console.log("Recipe Data:", recipeData);

    try {
        const response = await fetch("/api/recipe-routes/newRecipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipeData)
        });
        if (!response.ok) {
            throw new Error("Failed to add recipe");
        }
        alert("Recipe added successfully");
        form.reset();
    } catch (error) {
        console.error(error);
        alert("Failed to add recipe");
    }
});