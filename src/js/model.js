import { API_URL } from './config.js';
import { RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    allRecipes: [],
    allRecipesSliced: [],
    query: '',
  },
  pages: {
    allPages: 0,
    currentPage: 1,
  },
};

export const searchRecipe = async function (recipeName) {
  try {
    const data = await getJSON(`${API_URL}?search=${recipeName}`);

    state.search.allRecipes = data.data.recipes;
    state.search.allRecipesSliced = sliceAllRecipes([...data.data.recipes]);
    state.search.query = recipeName;
    state.pages.allPages = state.search.allRecipesSliced.length;
    // state.pages.currentPage = state.search.allRecipesSliced[0];
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

const sliceAllRecipes = function (recipesArr) {
  let slicedArr = [];

  if (recipesArr.length <= 0) return slicedArr;

  slicedArr.push(recipesArr.splice(0, RESULTS_PER_PAGE));
  slicedArr = slicedArr.concat(sliceAllRecipes(recipesArr));

  return slicedArr;
};
