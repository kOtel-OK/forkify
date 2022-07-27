import View from './View.js';
import { DOMElements } from '../config.js';
import icons from '../../img/icons.svg';

class UserRecipe extends View {
  _btnCloseModal;
  _parentElement;
  _addRecipeWindow;
  _message = 'Your recipe was successfully uploaded!';

  showForm() {
    const markup = `
    <div class="add-recipe-window">
      <button class="btn--close-modal">&times;</button>
      <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST23" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST23" required name="source_url" type="text" />
          <label>Image URL</label>
          <input value="TEST23" required name="image_url" type="text" />
          <label>Publisher</label>
          <input value="TEST23" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cooking_time" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
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
  }

  hideForm() {
    this._addRecipeWindow.remove();
    DOMElements.addRecipeOverlay.classList.add('hidden');
  }

  collectElements() {
    this._addRecipeWindow = document.querySelector('.add-recipe-window');
    // prettier-ignore
    this._btnCloseModal = document.querySelector('.add-recipe-window .btn--close-modal');
    this._parentElement = document.querySelector('.upload');
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

  addHandlerUpload(callback) {
    const self = this;

    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = self._parentElement.querySelectorAll('.upload__column');

      callback(data);
    });
  }
}

export default new UserRecipe();
