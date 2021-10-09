# @thunder_fury/date-picker

<p align=''>
<img src='https://img.shields.io/badge/node-v12.18.3-blue'/> 
<a href='https://www.npmjs.com/package/@thunder_fury/react-components' target='blank' >
<img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white"/>
</a> 
<a href='https://thunder-fury-datepicker.netlify.app/' target='blank' >
<img src="https://img.shields.io/badge/sample-FF4785?style=flat-square&logo=&logoColor=white"/>
</a>
</p>
<br />

## Development Environment
<p align=''>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/></a> 
<br />

## 🚀Install

```shell
 npm i @thunder_fury/date-picker
```

```js
const { ThunderDatePicker } = require('./cerrent');
const inputDate = document.querySelector('[data-inputDate]');
const thunderFuryDatePicker = document.querySelector('.thunderFury-datePicker');
const thunderDatePicker = new ThunderDatePicker(thunderFuryDatePicker, {
  inputDate,
  weekend: true,
  disabled: true
})
thunderDatePicker.init();


```

## 🗓 Sample

<h3 align='center'>normal</h3>
<br />
<div align='center'>
<img width="278" alt="thunder_fury-calendar-normal" src="https://user-images.githubusercontent.com/66325822/136659230-1566c309-1dd5-4636-8a4a-f683055797c1.png">
<br /><br />
<h3 align='center'>disabled truy</h3>
<img width="279" alt="thunder_fury-calendar-disabled" src="https://user-images.githubusercontent.com/66325822/136659225-d90d5871-7317-40da-ae27-1826b16599d1.png">
<br />
<br />
<h3 align='center'>weekend truy</h3>
<img width="280" alt="thunder_fury-calendar-weekend" src="https://user-images.githubusercontent.com/66325822/136659228-efb5d598-bfdf-4c6b-bef3-f7b36f391aca.png">

<br />
<br />
</div>