

const main = document.querySelector('main');

window.onload = renderSite();
function renderSite() {
    // console.log(JSON.parse(sessionStorage.getItem('data')));
    const data = JSON.parse(sessionStorage.getItem('data'));
    
    const descriptionContainer = document.createElement('div');
    descriptionContainer.style.gridArea = 'description';
    descriptionContainer.classList.add('description-container');
    const mealName = document.createElement('h2');
    mealName.textContent = `${data.meal}`;
    const descriptionText = document.createElement('p');
    descriptionText.textContent = `${data.description}`;
    descriptionContainer.append(mealName, descriptionText);

    const imgContainer = document.createElement('div');
    imgContainer.style.gridArea = 'dish-img';
    imgContainer.classList.add('img-container');
    const img = document.createElement('img');
    img.src = `${data.image}${data.meal}`;
    imgContainer.append(img);

    const ingredientContainer = document.createElement('div');
    ingredientContainer.style.gridArea = 'ingredients';
    ingredientContainer.classList.add('ingredient-container');
    const ingredientTitle = document.createElement('h2');
    ingredientTitle.textContent = 'Ingredients';
    const ingredients = document.createElement('ol');
    data.ingredients.forEach(element => {
        const ingredient = document.createElement('li');
        ingredient.textContent = element;
        ingredients.append(ingredient);
    })
    ingredientContainer.append(ingredientTitle, ingredients);

    const recipeContainer = document.createElement('div');
    recipeContainer.style.gridArea = 'recipe';
    recipeContainer.classList.add('recipe-container');
    const recipeTitle = document.createElement('h2');
    recipeTitle.textContent = `Recipe`;
    const steps = document.createElement('ol');
    data.recipe.forEach(element => {
        const step = document.createElement('li');
        step.textContent = element;
        steps.append(step);
    })
    recipeContainer.append(recipeTitle, steps);

    main.append(descriptionContainer, imgContainer, ingredientContainer, recipeContainer);
}


