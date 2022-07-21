import icons from '../../img/icons.svg';

class Spinner {
  showSpinner(parentElement) {
    const markup = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
    `;

    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new Spinner();
