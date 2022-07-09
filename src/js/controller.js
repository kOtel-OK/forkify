//Polifyling
import 'core-js/actual';
import { async } from 'regenerator-runtime';
// import 'regenerator-runtime/runtime';
import icons from '../img/icons.svg';

const recipeContainer = document.querySelector('.recipe');
const allRecipesContainer = document.querySelector('.search-results .results');
const btnSearch = document.querySelector('.search__btn');
// const msgSearch = document.querySelector('.recipe .message');
// const spinnerSearch = document.querySelector('.spinner');
// const errSearch = document.querySelector('.recipe .error');
const inptSearch = document.querySelector('.search__field');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const showError = function (parentEL) {
  const markup = `
  <div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>No recipes found for your query. Please try again!</p>
</div>
  `;
  // parentEL.innerHTML = '';
  parentEL.insertAdjacentHTML('afterbegin', markup);
};

const showSpinner = function (parentEL) {
  const markup = `
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>
  `;
  parentEL.innerHTML = '';
  parentEL.insertAdjacentHTML('afterbegin', markup);
};

const hideSpinner = function (parentEl) {
  parentEl.querySelector('.spinner').remove();
};

const recipeNameCheck = function (recipeName) {
  // check if input contains numbers
  if (
    !/\d/.test(recipeName) &&
    !recipeName.includes(' ') &&
    recipeName.length > 0
  ) {
    inptSearch.value = '';
    return recipeName.toLowerCase();
  } else {
    inptSearch.value = '';
    throw new Error('No recipes found!');
  }
};

const showRecipe = async function (e) {
  try {
    e.preventDefault();
    const id = window.location.hash.slice(1);

    // if (!id) return;

    showSpinner(recipeContainer);

    // load data
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    const recipe = {
      id: data.data.recipe.id,
      title: data.data.recipe.title,
      publisher: data.data.recipe.publisher,
      sourceUrl: data.data.recipe.source_url,
      image: data.data.recipe.image_url,
      servings: data.data.recipe.servings,
      cookingTime: data.data.recipe.cooking_time,
      ingredients: data.data.recipe.ingredients,
    };

    // console.log(recipe);
    // render recipe
    const markup = `
    <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>

    <ul class="recipe__ingredient-list">
    ${recipe.ingredients
      .map(el => {
        return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${el.quantity || ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${el.unit || ''}</span>
          ${el.description}
        </div>
        </li>
        `;
      })
      .join('')}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
    `;

    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    showError(recipeContainer);
    console.error(error);
  } finally {
    hideSpinner(recipeContainer);
  }
};

const searchRecipe = async function (e) {
  e.preventDefault();

  try {
    showSpinner(allRecipesContainer);
    const mealName = inptSearch.value;
    recipeNameCheck(mealName);
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeNameCheck(
        mealName
      )}`
    );

    console.log(response);
    const data = await response.json();

    if (data.results === 0) throw new Error('No recipes found!');
    console.log(data);

    const allRecipes = data.data.recipes;

    const markup = allRecipes
      .map(el => {
        return `
      <li class="preview">
      <a class="preview__link preview__link--active" href="#${el.id}">
        <figure class="preview__fig">
          <img src="${el.image_url}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${el.title} ...</h4>
          <p class="preview__publisher">${el.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
      `;
      })
      .join('');

    console.log(allRecipes);

    allRecipesContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    showError(allRecipesContainer);
    console.log(error.message);
  } finally {
    hideSpinner(allRecipesContainer);
  }
};

// showRecipe();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// ['hashchange', 'load'].forEach(el => window.addEventListener(el, showRecipe));
window.addEventListener('hashchange', showRecipe);
btnSearch.addEventListener('click', searchRecipe);
