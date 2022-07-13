import icons from '../../img/icons.svg';

class ErrorMessage {
  showError(parentElement) {
    const markup = `
  <div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>No recipes found for your query. Please try again!</p>
</div>
  `;
    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  hideError(parentElement) {}
}

export default new ErrorMessage();
