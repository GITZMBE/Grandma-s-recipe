const homeMadeRecipeContainer = document.getElementById('home-made-recipe-container');
const randomRecipesContainer = document.getElementById('random-recipe-container');
const beerRecipeContainer = document.getElementById('beer-recipe-container');

let beerRenderAmount = 12;
let randomRenderAmount = 12;
function createRandomRecipe(url) {
    for (let i = 1; i <= randomRenderAmount; i++) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const obj = data.meals[0];
            let mealContainer = document.createElement('div');
            mealContainer.classList.add('recipe-container');
            randomRecipesContainer.append(mealContainer);

            let img = document.createElement('img');
            img.src = obj.strMealThumb;
            img.classList.add('dish-img');

            let title = document.createElement('h3');
            title.innerText = obj.strMeal;
            title.classList.add('dish-title');

            let description = document.createElement('p');
            description.innerText = obj.strInstructions;
            // description.innerText = `${data.strArea} meal with the main ingredient of ${data.strIngredient1} and has the category of ${data.strCategory}.`;
            description.classList.add('dish-description');

            mealContainer.append(img, title, description);
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }
}
function createBeerRecipe(url) {
    for(let i = 1; i <= beerRenderAmount; i++) {
        fetch(`${url}${i}`)
        .then(response => response.json())
        .then(data => {
            const obj = data[0];

            let beerContainer = document.createElement('div');
            beerContainer.classList.add('beer-recipe-container');
            beerRecipeContainer.append(beerContainer);

            let img = document.createElement('img');
            img.src = obj.image_url;
            img.classList.add('dish-img');

            let title = document.createElement('h3');
            title.innerText = obj.name;
            title.classList.add('dish-title');

            let description = document.createElement('p');
            description.innerText = obj.description;
            description.classList.add('dish-description');

            beerContainer.append(img, title, description);        
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }
}
function createHomeMadeContent() {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        for(const key in data) {
            createCustomRecipe(data[key], homeMadeRecipeContainer);
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}
export function createCustomRecipe(data, container) {
    let mealContainer = document.createElement('div');
    mealContainer.classList.add('recipe-container');
    container.append(mealContainer);

    let img = document.createElement('img');
    img.src = data.image + data.meal;
    img.classList.add('dish-img');

    let title = document.createElement('h3');
    title.innerText = data.meal;
    title.classList.add('dish-title');

    let description = document.createElement('p');
    description.innerText = data.description;
    description.classList.add('dish-description');

    mealContainer.append(img, title, description);
}

const foodUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const beerUrl = 'https://api.punkapi.com/v2/beers/';
createRandomRecipe(foodUrl);
createBeerRecipe(beerUrl);
createHomeMadeContent();

const beerBtn = document.getElementById('beer-btn');
const randomBtn = document.getElementById('random-btn');
beerBtn.addEventListener('click', e => {
    beerRenderAmount += 3;
    beerRecipeContainer.innerHTML = '';
    createBeerRecipe(beerUrl);
});
randomBtn.addEventListener('click', e => {
    randomRenderAmount += 3;
    randomRecipesContainer.innerHTML = '';
    createRandomRecipe(foodUrl);
})