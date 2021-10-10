const { ThunderDatePicker } = require('./cerrent');
const inputDate = document.querySelector('[data-inputDate]');
const thunderFuryDatePicker = document.querySelector('.thunderFury-datePicker');
const thunderDatePicker = new ThunderDatePicker(thunderFuryDatePicker, {
  inputDate: inputDate,
});
thunderDatePicker.init();
