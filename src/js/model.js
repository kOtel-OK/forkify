import { API_URL, API_KEY } from './config.js';
import { RESULTS_PER_PAGE } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

const createRecipeObject = function (obj) {
  state.recipe = {
    id: obj.id,
    title: obj.title,
    publisher: obj.publisher,
    sourceUrl: obj.source_url,
    image: obj.image_url,
    servings: obj.servings,
    cookingTime: obj.cooking_time,
    ingredients: obj.ingredients,
    ...(obj.key && { key: obj.key }),
    ...(obj.createdAt && { key: obj.createdAt }),
  };
};

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
    const data = await getJSON(
      `${API_URL}?search=${recipeName}&key=${API_KEY}`
    );

    state.search.allRecipes = data.data.recipes.map(el => {
      return {
        id: el.id,
        image: el.image_url,
        publisher: el.publisher,
        title: el.title,
        ...(el.key && { key: el.key }),
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
    const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`);

    createRecipeObject(data.data.recipe);

    state.bookmarks.forEach(el => {
      if (el.id === state.recipe.id) state.recipe.bookmarked = true;
    });
  } catch (error) {
    throw error;
  }
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const recipe = {
      ingredients: [],
    };

    let [recipeData, ingredients] = [...newRecipe];

    recipeData = recipeData.querySelectorAll('input');
    ingredients = ingredients.querySelectorAll('input');

    // Parse data to recipe object
    [...recipeData].forEach(el => {
      recipe[el.name] = Number.parseFloat(el.value) || el.value;
    });

    // Parse ingredients to resipe object
    [...ingredients].forEach(el => {
      // If recipe field not empty
      if (el.value) {
        const val = el.value.split(',');
        // If number of ingredients is 3
        if (val.length === 3) {
          recipe.ingredients.push({
            quantity: Number.parseFloat(val[0]) || null,
            unit: val[1],
            description: val[2],
          });
        } else throw new Error('Not valid ingredients format');
      }
    });

    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);

    createRecipeObject(data.data.recipe);
    addBookmark(state.recipe);
    setLocalStorage();
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
