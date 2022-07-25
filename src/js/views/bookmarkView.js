import View from './View.js';
import previewView from './previewView.js';
import { DOMElements } from '../config.js';

class Bookmark extends View {
  _parentElement = DOMElements.bookmarks;
  _recipeContainer = DOMElements.recipeContainer;
  _message = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateMarkup() {
    return previewView._generateMarkup(this._data);
  }

  // Publisher
  addHandlerBookmark(calback) {
    this._recipeContainer.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;

      calback();
    });
  }
}

export default new Bookmark();
