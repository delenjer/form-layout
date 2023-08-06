'use strict'

const button = document.querySelector('.button');
const fields = document.querySelectorAll('.input-action');
const errorList = document.querySelectorAll('.error');
const checkboxWrap = document.querySelector('.custom-checkbox');

const errorHandler = (isError, fieldName) => {
  errorList.forEach(item => {
    if (item.dataset.error === fieldName) {
      isError ? item.classList.add('show-error') : item.classList.remove('show-error');
    }
  });
}

const handlerPassword = (val, fieldName, handler) => {
  const patternPass = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{3,}$/g;
  const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;

  return fieldName === 'email' ?
    handler(!patternEmail.test(val), fieldName) :
    handler(!patternPass.test(val), fieldName);
}

button.addEventListener('click', (e) => {
  e.preventDefault();

  let passwordText = '';

  fields.forEach(field => {
    switch (field.name) {
      case 'firstName':
          errorHandler(field.value.length < 2, 'firstName');
        break;
      case 'secondName':
          errorHandler(field.value.length < 2, 'secondName');
        break;
      case 'country':
          errorHandler(!field.value.length, 'country');
        break;
      case 'phone':
          errorHandler(!field.value.length, 'phone');
        break;
      case 'password':
          passwordText = field.value;
          handlerPassword(field.value, 'password', errorHandler);
        break;
      case 'passwordConfirm':
          let isValidPass = !field.value.includes(passwordText) || !field.value.length;
          errorHandler(isValidPass, 'passwordConfirm');
        break;
      case 'email':
          handlerPassword(field.value, 'email', errorHandler);
        break;
      case 'checkbox':
          !field.checked ?
            checkboxWrap.classList.add('checkbox-error') :
            checkboxWrap.classList.remove('checkbox-error');
        break;

      default:
        return;
    }
  });

  if (![...errorList].some(item => item.classList.contains('show-error'))) {
    fields.forEach(field => {
      field.value = '';
    });
  }
});
