const REGEXP = {
  name: /.+/, // хотя бы один символ
  tel: /^(\+7|7|8)?[\s-]?\(?[49][0-9]{2}\)?[\s-]?[0-9]{2}[\s-]?([0-9][\s-]?){3}[0-9]{2}$/, // +7 999 999-99-99
  email: /.+@.+\..+/, // t@t.t где t - хотя бы один символ
};

const INVALID_CLASS = 'invalid';

const setValidity = (input, isValid) => {
  if (isValid) {
    input.classList.remove(INVALID_CLASS);
  } else {
    input.classList.add(INVALID_CLASS);
    input.addEventListener('input', () => {
      input.classList.remove(INVALID_CLASS);
    }, { once: true });
  }
};

const validateToggle = toggle => {
  const isValid = toggle.checked;
  setValidity(toggle, isValid);
  return isValid;
};

const validateInput = input => {
  const type = input.dataset.type;
  if (type === 'toggle') return validateToggle(input);
  const value = input.value.trim();
  const isValid = REGEXP[type].test(value);
  setValidity(input, isValid);
  return isValid;
};


const validate = form => {
  const inputs = [...form.querySelectorAll('.js-input')];
  const required = inputs.filter(input => input.dataset.required);
  const validities = required.map(input => validateInput(input));
  return validities.every(isValid => isValid === true);
};

export default validate;
