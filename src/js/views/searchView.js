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

function binarySearch(arr, n) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);

    if (arr[middle] === n) return middle;

    if (n < arr[middle]) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }

  return -1;
}

binarySearch([1, 3, 5, 12, 34, 35, 43, 50], 43); //6
