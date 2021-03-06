import icons from '../../img/icons.svg';

class ErrorMessage {
  showError(parentElement, errorMessage) {
    const markup = `
  <div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${errorMessage || 'No recipes found for your query. Please try again!'}</p>
</div>
  `;
    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new ErrorMessage();
