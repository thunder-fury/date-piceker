const { ThunderDatePicker } = require('./cerrent');
const inputDate = document.querySelector('[data-inputDate]');
const thunderFuryDatePicker = document.querySelector('.thunderFury-datePicker');
const thunderDatePicker = new ThunderDatePicker(thunderFuryDatePicker, {
  inputDate: inputDate,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  today: new Date().getDate(),
  // weekend: true,
  disabled: true
})
console.log(thunderDatePicker)
thunderDatePicker.init();

