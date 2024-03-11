async function setActiveRecipe(recipeName) {
  const response = await fetch(`/api/recipe/${recipeName}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log("Recipe set to active");
    // document.location.replace(`/recipe/${recipeName}`);

  } else {
    alert(response.statusText);
  }

};

document.querySelector('#setActive').addEventListener('click', () => {
  const recipeNameInput = document.querySelector('#recipeNameInput');
  const recipeName = recipeNameInput.textContent;
  setActiveRecipe(recipeName);
});