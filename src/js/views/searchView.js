import View from './View.js';
import { DOMElements } from '../config.js';
import { recipeNameCheck } from '../helpers.js';

class SearchView extends View {
  _parentElement = DOMElements.allRecipesContainer;
  inptSearch = DOMElements.inptSearch;
  btnSearch = DOMElements.btnSearch;

  getQuery() {
    return recipeNameCheck(this.inptSearch.value, this.inptSearch);
  }

  // Publisher
  addHandlerRender(callback) {
    this.btnSearch.addEventListener('click', callback);
  }

  _generateMarkup() {
    const currentID = window.location.hash.slice(1);

    return this._data
      .map(el => {
        return `
      <li class="preview ${currentID === el.id ? 'preview__link--active' : ''}">
      <a class="preview__link" href="#${el.id}">
        <figure class="preview__fig">
          <img src="${el.image_url}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${el.title} ...</h4>
          <p class="preview__publisher">${el.publisher}</p>

        </div>
      </a>
    </li>
      `;
      })
      .join('');
  }
}

export default new SearchView();
