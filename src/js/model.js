import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  allRecipes: [],
  //   DOMElements: {
  //     recipeContainer: document.querySelector('.recipe'),
  //     allRecipesContainer: document.querySelector('.search-results .results'),
  //     btnSearch: document.querySelector('.search__btn'),
  //     inptSearch: document.querySelector('.search__field'),
  //   },
};

export const searchRecipe = async function (recipeName) {
  try {
    const data = await getJSON(`${API_URL}?search=${recipeName}`);

    state.allRecipes = data.data.recipes;
  } catch (error) {
    throw error;
  }
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

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
    throw error;
  }
};
