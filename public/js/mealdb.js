// look up single random meal
function getRandomRecipe() {
    const apiKey = '092a615921094f62be1f6c31d55f14b7';
    const apiUrl = 'https://api.spoonacular.com/recipes/random';

    fetch(`${apiUrl}?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const recipe = data.recipes[0];
            const servings = recipe.servings;
            const ingredients = recipe.extendedIngredients.map(ingredient => ingredient.original);

            console.log(data.recipes);
            console.log('Servings:', servings);
            console.log('Ingredients:', ingredients);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

getRandomRecipe();