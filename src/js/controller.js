import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import spinner from './views/spinnerView.js';
import errorMessage from './views/errorView.js';
import { recipeNameCheck } from './helpers.js';
//Polifyling
import 'core-js/actual';
import { async } from 'regenerator-runtime';
// import 'regenerator-runtime/runtime';

const { DOMElements } = model.state;

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

const controlRecipe = async function (e) {
  try {
    e.preventDefault();
    const id = window.location.hash.slice(1);

    // if (!id) return;
    spinner.showSpinner(DOMElements.recipeContainer);
    // loading recipe from model, it returns Promise so...
    await model.loadRecipe(id);
    // render recipe
    recipeView.render(model.state.recipe);
    spinner.hideSpinner(DOMElements.recipeContainer);
  } catch (error) {
    errorMessage.showError(DOMElements.recipeContainer, error.message);
    console.error(error.message, 'In controlRecipe in controller.js!!!');
  }
};

const controlAllRecipes = async function (e) {
  try {
    e.preventDefault();

    const recipeName = recipeNameCheck(
      DOMElements.inptSearch.value,
      DOMElements.inptSearch
    );

    spinner.showSpinner(DOMElements.allRecipesContainer);
    await model.searchRecipe(recipeName);

    if (model.state.allRecipes.length === 0) throw new Error();

    searchView.render(model.state.allRecipes);
    spinner.hideSpinner(DOMElements.allRecipesContainer);
  } catch (error) {
    errorMessage.showError(DOMElements.allRecipesContainer, error.message);
    console.error(error.message, 'In controlAllRecipes in controller.js!!!');
  }
};

// ['hashchange', 'load'].forEach(el => window.addEventListener(el, controlRecipe));
window.addEventListener('hashchange', controlRecipe);
DOMElements.btnSearch.addEventListener('click', controlAllRecipes);
