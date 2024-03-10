async function setActiveRecipe(recipeName) {

const response = await fetch(`/api/recipe/${recipeName}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
});

if (response.ok) {
  document.location.replace(`/recipe/${recipeName}`);
} else {
  alert(response.statusText);
}
console.log(recipeRoute);

};

document.querySelector('#setActive').addEventListener('click', setActiveRecipe);