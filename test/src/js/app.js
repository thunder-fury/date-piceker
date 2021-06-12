const { ThunderDatePicker } = require('./cerrent');
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();
const inputDate = document.querySelector('[data-inputDate]');
const thunderFuryDatePicker = document.querySelector('.thunderFury-datePicker');
const thunderDatePicker = new ThunderDatePicker(thunderFuryDatePicker, {
  inputDate: inputDate,
  year: currentYear,
  month: currentMonth,
  today: currentDay,
  weekend: true,
})
console.log(thunderDatePicker)
thunderDatePicker.init();

