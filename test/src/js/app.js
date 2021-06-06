const { ThunderDatePicker } = require('./cerrent');
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
const yearElm = document.querySelector('[data-year]');
const monthElm = document.querySelector('[data-month]');
const inputDate = document.querySelector('[data-inputDate]');
const currentNations = document.querySelectorAll('[data-currentNation]');
const currentBody = document.querySelector('[data-currentBody]')

const thunderDatePicker = new ThunderDatePicker({
  //- 커렌트 세팅
  inputdateElm: inputDate,
  yearElm: yearElm,
  monthElm: monthElm,
  year: currentYear,
  month: currentMonth,
  //- 커렌트 c네션 엘리먼트
  nation: currentNations,
  body: currentBody,
  weekend: true
});
console.log(thunderDatePicker)
thunderDatePicker.init();
