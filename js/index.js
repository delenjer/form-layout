'use strict'

const fieldInputCountry = document.querySelector('.input-field-country');
const selectItems = document.querySelectorAll('.select-item');
const selectOptions = document.querySelector('.select-options');
const fieldPhone = document.querySelector('.input-field-phone');
const fieldCountry = document.querySelector('.field-country');
let mask;

const phoneList = {
  'Afghanistan': '+{93}(000)000-00-00',
  'Albania': '+{5}(000)000-00-00',
}

function toggleOptions(event) {
  if (fieldCountry.contains(event.target)) {
    selectOptions.style.display = 'block';
  } else {
    selectOptions.style.display = 'none';
  }
}

function phoneMask(val) {
  const maskOptions = {
    mask: phoneList[val],
    lazy: false,
  };

  mask = new IMask(fieldPhone, maskOptions);

  mask.on("accept", () => fieldPhone.value = mask.value);
}

function selectOption() {
  selectItems.forEach(item => {
    item.addEventListener('click', () => {
      fieldInputCountry.value = item.textContent;
      fieldPhone.value = '';

      if (mask) {
        mask.destroy();
      }

      phoneMask(item.textContent);
    });
  });
}

selectOption();

document.addEventListener('click', (e) => toggleOptions(e));
