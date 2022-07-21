import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
//Polifyling
import 'core-js/actual';
import { async } from 'regenerator-runtime';
// import 'regenerator-runtime/runtime';

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
    recipeView.markActiveRecipe();
    // Subscriber for changing servings events
    recipeView.adHandlerServings(controlServings);
  } catch (error) {
    recipeView.showError();
    console.error(error.message, 'The controlRecipe in the controller.js!!!');
  }
};

const controlAllRecipes = async function (e) {
  try {
    e.preventDefault();
    const { search, pages } = model.state;
    const recipeName = searchView.getQuery();

    searchView.showSpinner();

    await model.searchRecipe(recipeName);

    if (search.allRecipes.length === 0) {
      paginationView.clearContainer();

      throw new Error();
    }

    pages.currentPage = 1;
    searchView.render(search.allRecipesSliced[pages.currentPage - 1]);
    paginationView.renderBtnInit(model.state);
  } catch (error) {
    searchView.showError(error.message);
    console.error(
      error.message,
      'The controlAllRecipes in the controller.js!!!'
    );
  }
};

const controlPagination = function (currentPage) {
  const { search } = model.state;

  paginationView.renderBtns();
  searchView.render(search.allRecipesSliced[currentPage - 1]);
  recipeView.markActiveRecipe();
};

const controlServings = function (servingsState) {
  model.calculateServings(servingsState);
  recipeView.updateView(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerRender(controlAllRecipes);
  paginationView.addHandlerPagination(controlPagination);
};

init();

//Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
