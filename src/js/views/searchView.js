import View from './View.js';
import previewView from './previewView.js';
import { DOMElements } from '../config.js';
import { recipeNameCheck } from '../helpers.js';

class SearchView extends View {
  _parentElement = DOMElements.allRecipesContainer;
  _inptSearch = DOMElements.inptSearch;
  _btnSearch = DOMElements.btnSearch;

  getQuery() {
    return recipeNameCheck(this._inptSearch.value, this._inptSearch);
  }

  // Publisher
  addHandlerRender(callback) {
    this._btnSearch.addEventListener('click', callback);
  }

  _generateMarkup() {
    return previewView._generateMarkup(this._data);
  }
}

export default new SearchView();
