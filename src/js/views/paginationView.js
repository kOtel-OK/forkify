import { DOMElements } from '../config.js';
import icons from '../../img/icons.svg';

class Pagination {
  _parentElement = DOMElements.paginationContainer;
  _data;
  currentPage;

  clearContainer() {
    this._parentElement.innerHTML = '';
  }

  markupPrev() {
    return `
    <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this.currentPage - 1}</span> 
    </button>
    `;
  }

  markupNext() {
    return `
    <button class="btn--inline pagination__btn--next">
        <span>Page ${this.currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
  }

  renderBtnInit(data) {
    this._data = data;
    this.currentPage = this._data.pages.currentPage;
    this._parentElement.innerHTML = '';

    if (this._data.pages.allPages < 2) return;

    this._parentElement.insertAdjacentHTML('afterbegin', this.markupNext());
  }

  renderBtns() {
    this._parentElement.innerHTML = '';

    if (this.currentPage === 1) {
      this._parentElement.insertAdjacentHTML('afterbegin', this.markupNext());
    } else if (this.currentPage === this._data.pages.allPages) {
      this._parentElement.insertAdjacentHTML('afterbegin', this.markupPrev());
    } else {
      this._parentElement.insertAdjacentHTML('afterbegin', this.markupPrev());
      this._parentElement.insertAdjacentHTML('afterbegin', this.markupNext());
    }
  }

  addHandlerPagination(callback) {
    this._parentElement.addEventListener('click', e => {
      const paginationBtn = e.target.closest('.btn--inline');

      if (!paginationBtn) return;

      if (paginationBtn.classList.contains('pagination__btn--prev')) {
        this.currentPage -= 1;
      }

      if (paginationBtn.classList.contains('pagination__btn--next')) {
        this.currentPage += 1;
      }
      callback(this.currentPage);
    });
  }
}

export default new Pagination();
