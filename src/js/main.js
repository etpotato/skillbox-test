import Inputmask from 'inputmask';
import validate from './validate.js';
import ajax from './api.js';
import Popup from './popup.js';

const POPUP_SUCCESS = 'ajax-success';
const POPUP_ERROR = 'ajax-error';

const form = document.querySelector('.js-form');
const popupElements = [...document.querySelectorAll('.js-popup')];

const inputMask = new Inputmask({
  mask: '+7 (999) 999-99-99',
  showMaskOnHover: false,
});

const inputs = [...form.querySelectorAll('.js-input')];
inputs.forEach(input => {
  const mask = input.dataset.mask;
  if (!mask) return;
  inputMask.mask(input);
});

const popups = {};
popupElements.forEach(popup => {
  const type = popup.dataset.popup;
  popups[type] = new Popup(popup);
});

const submitForm = submittedForm => {
  const data = new FormData(submittedForm);
  // eslint-disable-next-line no-console
  for (const pair of data.entries()) console.log(`${pair[0]}: ${pair[1]}`);
  ajax(data)
    .then(response => {
      if (response.ok) {
        popups[POPUP_SUCCESS].open();
        form.reset();
        return;
      }
      throw new Error('response error');
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      popups[POPUP_ERROR].open();
    });
};

form.addEventListener('submit', evt => {
  evt.preventDefault();
  return validate(evt.target) ? submitForm(evt.target) : false;
});
