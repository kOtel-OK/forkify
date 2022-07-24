import View from './View.js';
import { DOMElements } from '../config.js';

class Bookmark extends View {
  _parentElement = DOMElements.bookmarks;
  _recipeContainer = DOMElements.recipeContainer;
  _btnBookmark;

  _generateMarkup() {
    return this._data.bookmarks
      .map(el => {
        return `
    <li class="preview">
    <a class="preview__link" href="#${el.id}">
      <figure class="preview__fig">
        <img src="${el.image}" alt="${el.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">
          ${el.title}
        </h4>
        <p class="preview__publisher">${el.publisher}</p>
      </div>
    </a>
  </li>`;
      })
      .join('');
  }

  addHandlerBookmark(calback) {
    this._recipeContainer.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;

      calback();
    });
  }
}

export default new Bookmark();
