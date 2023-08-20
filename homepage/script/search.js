import { createCustomRecipe } from './render.js';
import { capitalize } from './capitalize.js';

const recipeSection = document.getElementById('recipe-section');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const searchTitle = document.getElementById('search-title');
const searchContainer = document.getElementById('searched-container');

searchBar.addEventListener('input', findSearch);

searchBar.addEventListener('focus', () => {
    document.addEventListener('keypress', e => {
        if (e.key === 'Enter' && document.activeElement === searchBar) {
            scrollDown();
        } 
    })
});

searchBtn.addEventListener('click', scrollDown);

function findSearch() {
    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            if (searchBar.focus && searchBar.value !== '') {
                searchContainer.innerHTML = '';
                let searchResult = false;
                for (const key in data) {
                    const element = data[key];
                    if (element.meal.toLowerCase().includes(searchBar.value.toLowerCase())) {
                        searchResult = true;
                        searchContainer.style.gridTemplateColumns = 'repeat(auto-fill, var(--recipe-size))';
                        searchContainer.style.minHeight = '';
                        searchTitle.classList.remove('hide');
                        searchContainer.classList.remove('hide');
                        createCustomRecipe(element, searchContainer);
                    } else if (!searchResult && key == Object.keys(data).length - 1) {
                        searchContainer.style.gridTemplateColumns = 'repeat(var(--recipe-size))';
                        searchContainer.innerHTML = '<img id="no-result-img" src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png">No Results Found';
                        searchContainer.style.minHeight = '100vh';
                        searchTitle.classList.remove('hide');
                        searchContainer.classList.remove('hide');
                    }
                }
            } else if (searchBar.value === '') {
                searchContainer.innerHTML = '';
                searchContainer.style.minHeight = '';
                searchTitle.classList.add('hide');
                searchContainer.classList.add('hide');                
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function scrollDown() {
    window.scrollTo({
        top: recipeSection.offsetTop,
        behavior: 'smooth'
    })    
};
