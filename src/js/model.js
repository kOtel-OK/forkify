// import errorMessage from './views/errorView.js';
export const state = {
  recipe: {},
  allRecipes: [],
  DOMElements: {
    recipeContainer: document.querySelector('.recipe'),
    allRecipesContainer: document.querySelector('.search-results .results'),
    btnSearch: document.querySelector('.search__btn'),
    inptSearch: document.querySelector('.search__field'),
  },
};

export const recipeNameCheck = function (recipeName, inputElement) {
  // check if input contains numbers
  if (
    /\D/.test(recipeName) &&
    !recipeName.includes(' ') &&
    recipeName.length > 0
  ) {
    inputElement.value = '';
    return recipeName.toLowerCase();
  } else {
    inputElement.value = '';
    throw new Error('No recipes found!');
  }
};

export const searchRecipe = async function (recipeName) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`
    );

    const data = await response.json();

    if (data.results === 0) throw new Error('No recipes found!');

    state.allRecipes = data.data.recipes;
  } catch (error) {
    console.log(error);
  }
};

export const loadRecipe = async function (id) {
  try {
    // load data
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    state.recipe = {
      id: data.data.recipe.id,
      title: data.data.recipe.title,
      publisher: data.data.recipe.publisher,
      sourceUrl: data.data.recipe.source_url,
      image: data.data.recipe.image_url,
      servings: data.data.recipe.servings,
      cookingTime: data.data.recipe.cooking_time,
      ingredients: data.data.recipe.ingredients,
    };
  } catch (error) {
    console.log(error);
  }
};
