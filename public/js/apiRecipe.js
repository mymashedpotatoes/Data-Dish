// look up single random meal
function getRandomRecipe() {
    const apiKey = '092a615921094f62be1f6c31d55f14b7';
    const apiUrl = 'https://api.spoonacular.com/recipes/random';

    fetch(`${apiUrl}?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const recipe = data.recipes[0];
            const recipeName = recipe.title;
            const servings = recipe.servings;
            const ingredients = recipe.extendedIngredients.map(ingredient => ingredient.original);
            const imageUrl = recipe.image;
            const recipeUrl = recipe.sourceUrl;

            document.getElementById('randomRecipeName').textContent = recipeName;
            document.getElementById('randomRecipeImage').src = imageUrl;
            document.getElementById('randomRecipeServings').textContent = `Servings: ${servings}`;
            document.getElementById('randomRecipeLink').href = recipeUrl;
            const ingredientsList = document.getElementById('randomRecipeIngredients');
            ingredientsList.innerHTML = '';
            ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};
var apiBtn = document.getElementById("apiBtn");
apiBtn.addEventListener("click", getRandomRecipe);