import spinner from './spinnerView';
import error from './errorView';
import message from './messageView';

export default class View {
  _data;
  _message;

  showSpinner() {
    return spinner.showSpinner(this._parentElement);
  }

  hideSpinner() {
    return spinner.hideSpinner(this._parentElement);
  }

  showError(err) {
    return error.showError(this._parentElement, err);
  }

  showMessage() {
    return message.showMessage(this._parentElement, this._message);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  updateView(data) {
    if (!data) return;

    this._data = data;
    const newMarkup = this._generateMarkup();

    // Create the virtual copy of all nodes
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //Create arrays with all new and current nodes
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    newElements.forEach((newElement, idx) => {
      const currentElement = currentElements[idx];

      // Check if current Node and new Node are different and
      if (
        !newElement.isEqualNode(currentElement) &&
        // if first child Node (text) not empty, other words, if an element is a text
        // because nodeValue returns NULL for Element and text content - for TEXT
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }

      // Replacing of attributes (class, data...)
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attr =>
          currentElement.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  /**
   * Render recieved object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. Recipe)
   * @this {Object} View instance
   */
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    if (Array.isArray(data) && data.length === 0) {
      this.showMessage();
    }

    if (data.id) window.location.hash = data.id;
  }
}
