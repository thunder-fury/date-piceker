# @thunder_fury/date-picker

Underwarn development...

<p align=''>
<img src='https://img.shields.io/badge/node-v14.15.4-blue'/> 
<a href='https://www.npmjs.com/package/@thunder_fury/date-picker' target='blank' >
<img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white"/>
</a> 
<a href='https://thunder-fury-datepicker.netlify.app/' target='blank' >
<img src="https://img.shields.io/badge/sample-FF4785?style=flat-square"/>
</a>
</p>
<br />

## Development Environment
<p align=''>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>

<br />

## 🚀Install

```shell
 npm i @thunder_fury/date-picker
```

```js
 const { ThunderDatePicker } = require('@thunder_fury/date-picker');
 import { ThunderDatePicker } from '@thunder_fury/date-picker'
```


```js
const { ThunderDatePicker } = require('@thunder_fury/date-picker');
const inputDate = document.querySelector('[data-inputDate]');
const thunderFuryDatePicker = document.querySelector('.thunderFury-datePicker');
const thunderDatePicker = new ThunderDatePicker(thunderFuryDatePicker, {
  inputDate,
})
thunderDatePicker.init();

```

## Option
|  Name  |  Required  |  Type  | DefaultValue  | Description  |
| ---- | ---- |  ----  |  ----  |  ----  | 
|  inputDate  |  ○  |  string  |  -  |  Input elment to set date |
|  weekend  |  -  |  boolean  |  -  |  weekend disabled |
|  disabled  |  -  |  boolean  |  -  |  On the day disabled |

<br />
<br />
<h2 align='center'> 🗓 Sample </h2>

<div align='center'>
<br />
<h3>normal type</h3>
<img width="278" alt="thunder_fury-calendar-normal" src="https://user-images.githubusercontent.com/66325822/136659230-1566c309-1dd5-4636-8a4a-f683055797c1.png">
<br /><br />
  <h3>weekend disabled type</h3>
<img width="280" alt="thunder_fury-calendar-weekend" src="https://user-images.githubusercontent.com/66325822/136659228-efb5d598-bfdf-4c6b-bef3-f7b36f391aca.png">
<br /><br />
  <h3>disabled type</h3>
<img width="279" alt="thunder_fury-calendar-disabled" src="https://user-images.githubusercontent.com/66325822/136659225-d90d5871-7317-40da-ae27-1826b16599d1.png">


</div>