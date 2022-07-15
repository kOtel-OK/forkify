import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
//Polifyling
import 'core-js/actual';
import { async } from 'regenerator-runtime';
// import 'regenerator-runtime/runtime';

//Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function (e) {
  try {
    e.preventDefault();
    const id = window.location.hash.slice(1);
    // Guard clause
    if (!id) return;

    recipeView.showSpinner();

    // Loading recipe from model, it returns Promise so...
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);

    recipeView.hideSpinner();
  } catch (error) {
    recipeView.showError();
    console.error(error.message, 'The controlRecipe in the controller.js!!!');
  }
};

const controlAllRecipes = async function (e) {
  try {
    e.preventDefault();
    const { search } = model.state;

    const recipeName = searchView.getQuery();

    searchView.showSpinner();
    await model.searchRecipe(recipeName);

    if (search.allRecipes.length === 0) throw new Error();

    searchView.render(search.allRecipes);
    searchView.hideSpinner();
  } catch (error) {
    searchView.showError(error.message);
    console.error(
      error.message,
      'The controlAllRecipes in the controller.js!!!'
    );
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerRender(controlAllRecipes);
};

init();
