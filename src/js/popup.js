export default class {
  constructor (popupElem) {
    this.popupElement = popupElem;
    this.underlay = this.popupElement.querySelector('.js-popup-underlay');
    this.closePopup = this.popupElement.querySelector('.js-popup-close');
    this.activeClass = 'active';
    this.open = this.open.bind(this);
    this._close = this._close.bind(this);
    this._onEsc = this._onEsc.bind(this);
  }

  open () {
    this.popupElement.style.display = 'flex';
    requestAnimationFrame(() => {
      this.popupElement.classList.add(this.activeClass);
      this._addListeners();
      document.body.classList.add('no-scroll');
    });
  }

  _close (evt) {
    evt.preventDefault();
    this.popupElement.classList.remove(this.activeClass);
    this.popupElement.addEventListener('transitionend', () => {
      this.popupElement.style.display = 'none';
      this._removeListeners();
      document.body.classList.remove('no-scroll');
    }, { once: true });
  }

  _onEsc (evt) {
    const escKeyValues = ['Escape', 'Esc'];
    if (escKeyValues.some(code => evt.key === code)) this._close(evt);
  }

  _addListeners () {
    this.underlay.addEventListener('click', this._close);
    this.closePopup.addEventListener('click', this._close);
    document.addEventListener('keydown', this._onEsc);
  }

  _removeListeners () {
    this.underlay.removeEventListener('click', this._close);
    this.closePopup.removeEventListener('click', this._close);
    document.removeEventListener('keydown', this._onEsc);
  }
}
