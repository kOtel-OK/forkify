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
  bookmarks: [],
};

export const searchRecipe = async function (recipeName) {
  try {
    const data = await getJSON(`${API_URL}?search=${recipeName}`);

    state.search.allRecipes = data.data.recipes.map(el => {
      return {
        id: el.id,
        image: el.image_url,
        publisher: el.publisher,
        title: el.title,
      };
    });

    state.search.allRecipesSliced = sliceAllRecipes([
      ...state.search.allRecipes,
    ]);

    state.search.query = recipeName;

    state.pages.allPages = state.search.allRecipesSliced.length;

    state.pages.currentPage = 1;
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

    state.bookmarks.forEach(el => {
      if (el.id === state.recipe.id) state.recipe.bookmarked = true;
    });
  } catch (error) {
    throw error;
  }
};

export const calculateServings = function (servingsState) {
  const { recipe } = state;
  const servingsPrev = recipe.servings;

  recipe.servings += servingsState;

  if (recipe.servings < 1) {
    recipe.servings++;
    return;
  }

  recipe.ingredients.forEach(el => {
    if (el.quantity) {
      el.quantity = (el.quantity / servingsPrev) * recipe.servings;
    }
    return el;
  });
};

const sliceAllRecipes = function (recipesArr) {
  let slicedArr = [];

  if (recipesArr.length <= 0) return slicedArr;

  slicedArr.push(recipesArr.splice(0, RESULTS_PER_PAGE));
  slicedArr = slicedArr.concat(sliceAllRecipes(recipesArr));

  return slicedArr;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  // mark recipe as bookmarked
  if (state.recipe.id === recipe.id) {
    state.recipe.bookmarked = true;
  }
};

export const removeBookmark = function (id) {
  const idx = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(idx, 1);
  state.recipe.bookmarked = false;
};

export const setLocalStorage = function () {
  window.localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const getLocalStorage = function () {
  const storage = window.localStorage;

  if (!storage.getItem('bookmarks')) return;

  state.bookmarks = JSON.parse(storage.getItem('bookmarks'));
};
