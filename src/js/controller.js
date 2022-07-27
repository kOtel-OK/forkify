import * as model from './model.js';
import { MESSAGE_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import userRecipeView from './views/addRecipeView.js';
//Polifyling
import 'core-js/actual';
import { async } from 'regenerator-runtime';
import addRecipeView from './views/addRecipeView.js';
// import 'regenerator-runtime/runtime';

const controlRecipe = async function (e) {
  try {
    e.preventDefault();
    const id = window.location.hash.slice(1);
    const { search, pages } = model.state;

    // Guard clause
    if (!id) return;

    recipeView.showSpinner();

    // Update all recipes list to make current recipe active
    searchView.updateView(search.allRecipesSliced[pages.currentPage - 1]);

    // Loading recipe from model, it returns Promise so...
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Update bookmarks
    bookmarkView.updateView(model.state.bookmarks);
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
  const { search, pages } = model.state;

  pages.currentPage = currentPage;

  paginationView.renderBtns();
  searchView.render(search.allRecipesSliced[currentPage - 1]);
};

const controlServings = function (servingsState) {
  model.calculateServings(servingsState);
  recipeView.updateView(model.state.recipe);
};

const controlBookmark = function () {
  const { recipe, bookmarks } = model.state;

  if (Object.keys(recipe).length === 0) return;

  if (bookmarks.some(el => el.id === recipe.id)) {
    model.removeBookmark(recipe.id);
    recipeView.updateView(model.state.recipe);
  } else {
    model.addBookmark(recipe);
    recipeView.updateView(model.state.recipe);
  }

  model.setLocalStorage();

  bookmarkView.render(model.state.bookmarks);

  if (bookmarks.length === 0) {
    bookmarkView.showMessage();
  }
};

controlLocalStorage = function () {
  model.getLocalStorage();

  if (!model.state.bookmarks.length) return;

  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipeForm = function () {
  addRecipeView.showForm();
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.showSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
    addRecipeView.showMessage();

    setTimeout(function () {
      addRecipeView.hideForm();
    }, MESSAGE_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.showError(error);
    console.error(error);
  }
};

const init = function () {
  controlLocalStorage();

  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerRender(controlAllRecipes);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.adHandlerServings(controlServings);
  bookmarkView.addHandlerBookmark(controlBookmark);
  addRecipeView.addHandlerShowForm(controlAddRecipeForm);
};

init();

//Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
