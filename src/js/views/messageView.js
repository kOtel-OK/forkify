import icons from '../../img/icons.svg';

class Message {
  _parentElement;
  _message;

  showMessage(parentElement, message) {
    this._parentElement = parentElement;
    this._message = message;

    const markup = `
    <div class="message">
    <div>
    <svg>
    <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
    ${this._message}
    `;

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new Message();
