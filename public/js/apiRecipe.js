// fetches random recipe from spoonacular
let recipe = null;
const getRandomRecipe = async () => {
    const apiKey = '092a615921094f62be1f6c31d55f14b7';
    const apiUrl = 'https://api.spoonacular.com/recipes/random';

    try {
        const response = await fetch(`${apiUrl}?apiKey=${apiKey}`);
        const data = await response.json();

        // Check if data is present and has a recipes array
        if (data && data.recipes && data.recipes.length > 0) {
            recipe = data.recipes[0];
            displayRandomRecipe(recipe);
            return recipe;
        } else {
            console.error('No recipe found in the response');
            return null;
        }

    } catch (err) {
        console.error('Error fetching data:', err);
        return null;
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

    const image = document.getElementById('randomRecipeImage')
    image.classList.remove('hide');

    const hiddenLink = document.getElementById('randomRecipeLink')
    hiddenLink.classList.remove('hide');

    const ingredientsList = document.getElementById('randomRecipeIngredients');
    ingredientsList.innerHTML = '';
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
};


const addToShoppingCart = async (recipe) => {
    if (!recipe) {
        console.error('Recipe data is missing');
        return;
    }
    const ingredients = recipe.extendedIngredients;
    console.log(ingredients);

    try {
        const response = await fetch('/api/random/add-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: ingredients.map(ingredient => ({
                    name: ingredient.originalName,
                    amount: ingredient.measures.us.amount.toString(),
                    unit: ingredient.unit || ''
                }))
            })
        });

        if (response.ok) {
            console.log('Ingredients added to shopping cart');
        } else {
            console.error('Failed to add ingredients to shopping cart');
        }
    } catch (error) {
        console.error('Error adding ingredients to shopping cart:', error);
    }
};


// add the random recipe to my recipes for week
const addRandomToRecipes = async (recipe) => {
    if (!recipe) {
        console.error('Recipe data is missing');
        return;
    }
    const ingredients = recipe.extendedIngredients;

    try {
        const response = await fetch('/api/random/newRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: recipe.title,
                servingSize: recipe.servings,
                Ingredients: ingredients.map(ingredient => ({
                    name: ingredient.originalName,
                    amount: ingredient.measures.us.amount.toString(),
                    unit: ingredient.unit || ''
                }))
            })
        });
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

apiBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    await getRandomRecipe();
});

// event listener for addToShoppingCart
const addRandomToCartBtn = document.getElementById('addRandomToCartBtn');

addRandomToCartBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!recipe) {
        console.error('No recipe available');
        return;
    }
    await addToShoppingCart(recipe);
});

// event listener for addRandomToRecipes
const addRandomToRecipeBtn = document.getElementById('addRandomToRecipeBtn');

addRandomToRecipeBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!recipe) {
        console.error('No recipe available');
        return;
    }
    await addRandomToRecipes(recipe);
});