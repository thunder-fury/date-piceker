const { ThunderDatePicker } = require('./cerrent');
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
const yearElm = document.querySelector('[data-year]');
const monthElm = document.querySelector('[data-month]');
const inputDate = document.querySelector('[data-inputDate]');
const currentNations = document.querySelectorAll('[data-currentNation]');
const currentBody = document.querySelector('[data-currentBody]');
const thunderFuryDatePicker = document.querySelector('.thunderFury-datePicker');
// const thunderDatePicker = new ThunderDatePicker(thunderFuryDatePicker, {
//   //- 커렌트 세팅
//   inputdateElm: inputDate,
//   year: currentYear,
//   month: currentMonth,
//   //- 커렌트 c네션 엘리먼트
//   nation: currentNations,
//   body: currentBody,
//   weekend: true,
//   days: ['일', '월', '화', '수', '목', '금', '토'],
//   months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
// });
const thunderDatePicker = new ThunderDatePicker(thunderFuryDatePicker, {
  inputDate: inputDate,
  year: currentYear,
  month: currentMonth,
  weekend: true,
  days: ['일', '월', '화', '수', '목', '금', '토'],
  months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
})
console.log(thunderDatePicker)
thunderDatePicker.init();

