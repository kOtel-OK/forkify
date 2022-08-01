import View from './View.js';
import { DOMElements } from '../config.js';
import icons from '../../img/icons.svg';

class UserRecipe extends View {
  _btnCloseModal;
  _parentElement;
  _addRecipeWindow;
  _uploadColumn;
  _ingredientCount = 0;
  _message = 'Your recipe was successfully uploaded!';

  _generateMarkup() {
    return `
    <div>
    <label>Ingredient <span>${++this._ingredientCount}</span></label>
    <button class="btn--tiny btn__ingredients--remove">
      <svg>
        <use href="${icons}#icon-minus-circle"></use>
      </svg>
      </button>
    
          <input
            value=""
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          /></div>`;
  }

  showForm() {
    const markup = `
    <div class="add-recipe-window">
      <button class="btn--close-modal">&times;</button>
      <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="" required name="title" type="text" />
          <label>URL</label>
          <input value="" required name="source_url" type="text" />
          <label>Image URL</label>
          <input value="" required name="image_url" type="text" />
          <label>Publisher</label>
          <input value="" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="" required name="cooking_time" type="number" />
          <label>Servings</label>
          <input value="" required name="servings" type="number" />
        </div>

        <div class="upload__column upload__column__ingredients">
          <h3 class="upload__heading">Ingredients</h3>
          <div class="upload__column__ingredients__container">
          ${this._generateMarkup()}
          </div>
    
        </div>

        <div class="upload__container__ingredients--add">
        <button class="btn--tiny btn__ingredients--add">
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
   
        </div>
       

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
    </div>
        `;

    DOMElements.addRecipeOverlay.classList.remove('hidden');
    document.body.insertAdjacentHTML('beforeend', markup);

    this.collectElements();
    this.addHandlerHideForm();
    this.addHandlerIngredients();
  }

  hideForm() {
    this._addRecipeWindow.remove();
    this._ingredientCount = 0;
    DOMElements.addRecipeOverlay.classList.add('hidden');
  }

  collectElements() {
    this._addRecipeWindow = document.querySelector('.add-recipe-window');
    // prettier-ignore
    this._btnCloseModal = document.querySelector('.add-recipe-window .btn--close-modal');
    this._parentElement = document.querySelector('.upload');
    this._uploadColumn = document.querySelector(
      '.upload__column__ingredients__container'
    );
  }

  addHandlerShowForm(callback) {
    DOMElements.btnAddRecipe.addEventListener('click', () => {
      this.showForm.bind(this);
      callback();
    });
  }

  addHandlerHideForm() {
    [this._btnCloseModal, DOMElements.addRecipeOverlay].forEach(el => {
      el.addEventListener('click', this.hideForm.bind(this));
    });
  }

  _recountIngredients() {
    const ingredientsCountArr = this._uploadColumn.querySelectorAll('span');

    ingredientsCountArr.forEach((el, idx) => {
      return (el.textContent = idx + 1);
    });

    this._ingredientCount = ingredientsCountArr.length;
  }

  addHandlerUpload(callback) {
    const self = this;

    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = self._parentElement.querySelectorAll('.upload__column');

      callback(data);
    });
  }

  addHandlerIngredients() {
    const self = this;

    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('button');

      if (!btn) return;

      if (btn.classList.contains('btn__ingredients--add')) {
        e.preventDefault();
        if (self._ingredientCount >= 10) return;

        self._uploadColumn.insertAdjacentHTML(
          'beforeend',
          self._generateMarkup()
        );
      }

      if (btn.classList.contains('btn__ingredients--remove')) {
        e.preventDefault();

        if (self._ingredientCount < 2) return;

        btn.closest('div').remove();
        self._recountIngredients();
      }
    });
  }
}

export default new UserRecipe();
