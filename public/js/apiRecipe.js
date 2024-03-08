// fetches random recipe from spoonacular
const getRandomRecipe = async () => {
    const apiKey = '092a615921094f62be1f6c31d55f14b7';
    const apiUrl = 'https://api.spoonacular.com/recipes/random';

    try {
        const response = await fetch(`${apiUrl}?apiKey=${apiKey}`);
        const data = await response.json();
        const recipe = data.recipes[0];

        displayRandomRecipe(recipe);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
};

// displays recipe info to page
const displayRandomRecipe = (recipe) => {
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
};

// adds random recipe ingredients to shopping cart
const addToShoppingCart = async (name, amount) => {
    try {
        const response = await fetch('/api/shopping-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, amount })
        })
        if (response.ok) {
            console.log('Recipe added to shopping cart');
        } else {
            alert('Failed to add to shopping cart');
        }
    } catch (err) {
        console.error('Error adding recipe to shopping cart:', err);
    }
};

// Fadd the random recipe to my recipes for week
const addRandomToRecipes = async (name, servingSize, ingredients) => {
    try {
        const response = await fetch('/api/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, servingSize, ingredients })
        })
        if (response.ok) {
            console.log('Random recipe added to recipes');
        } else {
            alert('Faled to add to recipes')
        }
    } catch (err) {
        console.error('Error adding random recipe to recipes:', err);
    }
};

// event listener for getRandomRecipe
const apiBtn = document.getElementById("apiBtn");
apiBtn.addEventListener("click", getRandomRecipe);

// event listener for addToShoppingCart
const addRandomToCartBtn = document.getElementById('addRandomToCartBtn');
addRandomToCartBtn.addEventListener("click", () => {
    const name = document.getElementById('randomRecipeName').textContent;
    const ingredientsList = document.getElementById('randomRecipeIngredients').getElementsByTagName('li');
    const amount = Array.from(ingredientsList).map(li => li.textContent);

    addToShoppingCart(name, amount);
});

// event listener for addRandomToRecipes
const addRandomToRecipeBtn = document.getElementById('addRandomToRecipeBtn');
addRandomToRecipeBtn.addEventListener('click', () => {
    const name = document.getElementById('randomRecipeName').textContent;
    const ingredientsList = document.getElementById('randomRecipeIngredients').getElementsByTagName('li');
    const ingredients = Array.from(ingredientsList).map(li => li.textContent);
    const servingSize = document.getElementById('randomRecipeServings').textContent;

    addRandomToRecipes(name, servingSize, ingredients);
});