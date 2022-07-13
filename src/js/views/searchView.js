import icons from '../../img/icons.svg';

class SearchView {
  #parentElement = document.querySelector('.search-results .results');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup() {
    return this.#data
      .map(el => {
        return `
      <li class="preview">
      <a class="preview__link preview__link--active" href="#${el.id}">
        <figure class="preview__fig">
          <img src="${el.image_url}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${el.title} ...</h4>
          <p class="preview__publisher">${el.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
      `;
      })
      .join('');
  }
}

export default new SearchView();
