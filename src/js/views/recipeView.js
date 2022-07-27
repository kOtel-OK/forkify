import View from './View.js';
import icons from '../../img/icons.svg';
import { DOMElements } from '../config.js';

class RecipeView extends View {
  _parentElement = DOMElements.recipeContainer;

  // Publisher
  addHandlerRender(callback) {
    ['hashchange', 'load'].forEach(el => window.addEventListener(el, callback));
  }

  adHandlerServings(calback) {
    let servingsState = 0;

    this._parentElement.addEventListener('click', function (e) {
      const servBtns = e.target.closest('button');

      if (!servBtns) return;

      if (servBtns.classList.contains('btn--increase-servings')) {
        servingsState = 1;
      }

      if (servBtns.classList.contains('btn--decrease-servings')) {
        servingsState = -1;
      }

      calback(servingsState);
    });
  }

  _transformQuantity(qtt) {
    if (qtt % 1 === 0) {
      return qtt;
    } else {
      return qtt.toFixed(2);
    }
  }

  _generateIngredients(ingredients) {
    return ingredients
      .map(el => {
        return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          this._transformQuantity(el.quantity) || ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${el.unit || ''}</span>
          ${el.description}
        </div>
        </li>
        `;
      })
      .join('');
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${!this._data.key ? `hidden` : ''}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
      
        <use href="${icons}#${
      this._data.bookmarked === true ? `icon-bookmark-fill` : `icon-bookmark`
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>

    <ul class="recipe__ingredient-list">
    ${this._generateIngredients(this._data.ingredients)}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
}

export default new RecipeView();
