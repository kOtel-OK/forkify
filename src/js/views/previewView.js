import View from './View.js';
import icons from '../../img/icons.svg';

class PreviewView extends View {
  _generateMarkup(data) {
    this._data = data;

    const currentID = window.location.hash.slice(1);

    return this._data
      .map(el => {
        return `
      <li class="preview ${currentID === el.id ? 'preview__link--active' : ''}">
      <a class="preview__link" href="#${el.id}">
        <figure class="preview__fig">
          <img src="${el.image}" alt="${el.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${el.title} ...</h4>
          <p class="preview__publisher">${el.publisher}</p>

        </div>
        <div class="recipe__user-generated ${!el.key ? `hidden` : ''}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      </a>
    </li>
      `;
      })
      .join('');
  }
}

export default new PreviewView();
