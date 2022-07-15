import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    allRecipes: [],
    query: '',
  },
};

export const searchRecipe = async function (recipeName) {
  try {
    const data = await getJSON(`${API_URL}?search=${recipeName}`);

    state.search.allRecipes = data.data.recipes;
    state.search.query = recipeName;
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
