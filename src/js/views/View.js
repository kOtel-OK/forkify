import spinner from './spinnerView';
import error from './errorView';

export default class View {
  _data;

  showSpinner() {
    return spinner.showSpinner(this._parentElement);
  }

  hideSpinner() {
    return spinner.hideSpinner(this._parentElement);
  }

  showError(message) {
    return error.showError(this._parentElement, message);
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
