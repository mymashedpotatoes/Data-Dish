// look up single random meal
const getRandomRecipe = async () => {
    const apiKey = '092a615921094f62be1f6c31d55f14b7';
    const apiUrl = 'https://api.spoonacular.com/recipes/random';

    await fetch(`${apiUrl}?apiKey=${apiKey}`)
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

//add those ingredients to shopping cart
function addToShoppingCart(name, amount) {
    fetch('/api/shopping-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, amount })
    })
        .then(response => {
            if (response.ok) {
                console.log('Recipe added to shopping cart');
            } else {
                console.error('Failed to add recipe to shopping cart');
            }
        })
        .catch(error => {
            console.error('Error adding recipe to shopping cart:', error);
        });
}
var addRandomToCartBtn = document.getElementById('addRandomToCartBtn');
addRandomToCartBtn.addEventListener("click", () => {
    const name = document.getElementById('randomRecipeName').textContent;
    const ingredientsList = document.getElementById('randomRecipeIngredients').getElementsByTagName('li');
    const amount = Array.from(ingredientsList).map(li => li.textContent);

    addToShoppingCart(name, amount);
});

//add the new recipes to my recipes
function addRandomToRecipes(name, servingSize, Ingredients) {
    fetch('/api/recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, servingSize, Ingredients })
    })
        .then(response => {
            if (response.ok) {
                console.log('Random recipe added to recipes');
            } else {
                console.error('Failed to add random recipe to recipes');
            }
        })
        .catch(error => {
            console.error('Error adding random recipe to recipes:', error);
        });
};

var addRandomToRecipeBtn = document.getElementById('addRandomToRecipeBtn');
addRandomToRecipeBtn.addEventListener('click', () => {
    const name = document.getElementById('randomRecipeName').textContent;
    const ingredientsList = document.getElementById('randomRecipeIngredients').getElementsByTagName('li');
    const Ingredients = Array.from(ingredientsList).map(li => li.textContent);
    const servingSize = document.getElementById('randomRecipeServings').textContent;

    addRandomToRecipes(name, servingSize, Ingredients);
});