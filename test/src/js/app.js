const { ThunderDatePicker } = require('./cerrent');
const inputDate = document.querySelector('[data-inputDate]');
const thunderFuryDatePicker = document.querySelector('.thunderFury-datePicker');
const thunderDatePicker = new ThunderDatePicker(thunderFuryDatePicker, {
  inputDate: inputDate,
  // disabled: true,
  weekend: true
});
thunderDatePicker.init();
