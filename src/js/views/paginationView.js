import { DOMElements } from '../config.js';
import icons from '../../img/icons.svg';

class Pagination {
  _parentElement = DOMElements.paginationContainer;
  _btnPrev = this._parentElement.querySelector(
    '.container__pagination__btn--prev'
  );
  _btnNext = this._parentElement.querySelector(
    '.container__pagination__btn--next'
  );
  _btnOther = this._parentElement.querySelector(
    '.container__pagination__btn--other'
  );

  _data;
  currentPage;

  clearBtns() {
    this._parentElement.querySelectorAll('div').forEach(el => {
      el.innerHTML = '';
    });
  }

  markupPrev() {
    const markup = `
    <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this.currentPage - 1}</span> 
    </button>
    `;

    this._btnPrev.insertAdjacentHTML('afterbegin', markup);
  }

  markupNext() {
    const markup = `
    <button class="btn--inline pagination__btn--next">
        <span>Page ${this.currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
    this._btnNext.insertAdjacentHTML('afterbegin', markup);
  }

  markupOther() {
    const markup = `<div>Page ${this.currentPage} of ${this._data.pages.allPages}</div>`;
    this._btnOther.insertAdjacentHTML('afterbegin', markup);
  }

  renderBtnInit(data) {
    this._data = data;
    this.currentPage = this._data.pages.currentPage;

    if (this._data.pages.allPages < 2) return;

    this.renderBtns();
  }

  renderBtns() {
    this.clearBtns();

    if (this.currentPage === 1) {
      this.markupOther();
      this.markupNext();
    } else if (this.currentPage === this._data.pages.allPages) {
      this.markupPrev();
      this.markupOther();
    } else {
      this.markupPrev();
      this.markupOther();
      this.markupNext();
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
