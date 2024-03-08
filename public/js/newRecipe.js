function addIngredientField() {
    const addIngredientField = document.getElementById("ingredients");
    const newIngredientDiv = document.createElement("div");
    newIngredientDiv.classList.add("ingredient");
    newIngredientDiv.innerHTML = `
        <input type="text" name="ingredients[]" placeholder="Ingredient" required>
        <input type="text" name="amounts[]" placeholder="Amount" required>
        <select name="units[]">
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
            <option value="tsp">tsp</option>
            <option value="tbsp">tbsp</option>
            <option value="cup">cup</option>
            <option value="oz">oz</option>
            <option value="lb">lb</option>
            <option value="each">each</option>
        </select>
        <button type="button" onclick="removeIngredientField(this)">Remove</button>
    `;
    newIngredientDiv.appendChild(newIngredientDiv);
}


function removeIngredientField