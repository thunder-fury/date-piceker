"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThunderDatePicker = void 0;
var Showcalendar = /** @class */ (function () {
    function Showcalendar(calendar, inputDate) {
        this.calendar = calendar;
        this.inputDate = inputDate;
    }
    Showcalendar.prototype.calendarDisplay = function () {
        var _this = this;
        this.inputDate.addEventListener('click', function () {
            _this.calendar.classList.toggle('is-show');
        });
    };
    return Showcalendar;
}());
var CurrentDate = /** @class */ (function () {
    function CurrentDate() {
    }
    CurrentDate.prototype.get = function () {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
        };
    };
    return CurrentDate;
}());
var CreatCalendar = /** @class */ (function () {
    function CreatCalendar(inputDate, weekend, disabled) {
        this.inputDate = inputDate;
        this.weekend = weekend;
        this.disabled = disabled;
        this.yearElm = document.querySelector('[data-year]');
        this.monthElm = document.querySelector('[data-month]');
        this.currentDate = new CurrentDate();
    }
    CreatCalendar.prototype.checkLeapYear = function (year) {
        // 윤년 계산
        if (year % 400 == 0) {
            return true;
        }
        else if (year % 100 == 0) {
            return false;
        }
        else if (year % 4 == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    CreatCalendar.prototype.getFirstDayOfWeek = function (year, month) {
        if (month < 10)
            month = '0' + month;
        return (new Date(year + '-' + month + '-01')).getDay();
    };
    CreatCalendar.prototype.getLastDayOfweek = function (year, month) {
        return new Date(year, month + 1, 0).getDay();
    };
    CreatCalendar.prototype.changeYearMonth = function (year, month) {
        var monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var firstDayOfWeek = this.getFirstDayOfWeek(year, month);
        var lastDayOfWeek = 7 - this.getLastDayOfweek(year, month - 1) - 1;
        var arrCalender = [];
        var remainDay = 7 - (arrCalender.length % 7);
        if (month == 2) {
            if (this.checkLeapYear(year))
                monthDay[1] = 29;
        }
        for (var i = 0; i < firstDayOfWeek; i++) {
            arrCalender.push('');
        }
        for (var i = 1; i <= monthDay[month - 1]; i++) {
            arrCalender.push(String(i));
        }
        if (remainDay < 7) {
            for (var i = 0; i < remainDay; i++) {
                arrCalender.push('');
            }
        }
        for (var i = 0; i <= lastDayOfWeek; i++) {
            arrCalender.push('');
        }
        var calendarBody = document.querySelector("[data-calendarBody]");
        this.renderDate(arrCalender, calendarBody, year, month);
    };
    // 주말 표시
    CreatCalendar.prototype.weekendRnder = function (arrDates, date, i) {
        if (i % 7 == 6) {
            arrDates.push("<div data-setdate disabled class=\"calendarDay sunday is-disabled\">" + date[i] + "</div>");
        }
        else if (i % 7 == 0) {
            arrDates.push("<div data-setdate disabled class=\"calendarDay saturday is-disabled\">" + date[i] + "</div>");
        }
        else {
            arrDates.push("<div data-setdate class=\"calendarDay\">" + date[i] + "</div>");
        }
    };
    CreatCalendar.prototype.renderDate = function (date, calendarBody, year, month) {
        var arrDates = [];
        for (var i = 0; i < date.length; i++) {
            var empty = date[i] == "" ? "empty" : "workday";
            if (i == 0) {
                arrDates.push("<div class='calendarRow'>");
            }
            else if (i % 7 == 0) {
                arrDates.push("</div>");
                arrDates.push("<div class='calendarRow'>");
            }
            if (this.disabled) {
                if (year == this.currentDate.get().year && month == this.currentDate.get().month && date[i] >= this.currentDate.get().day) {
                    // 금년 당월 당일 이후 렌더
                    this.weekendRnder(arrDates, date, i);
                }
                else if (year < this.currentDate.get().year && month < this.currentDate.get().month) {
                    // 금년 이전 당월 이전 렌더
                    arrDates.push("<div data-setdate disabled class=\"calendarDay is-disabled\">" + date[i] + "</div>");
                }
                else if (year < this.currentDate.get().year) {
                    // 금년 이전 렌더
                    arrDates.push("<div data-setdate disabled class=\"calendarDay is-disabled\">" + date[i] + "</div>");
                }
                else if (month > this.currentDate.get().month) {
                    // 당월 이후 렌더
                    this.weekendRnder(arrDates, date, i);
                }
                else if (year > this.currentDate.get().year) {
                    // 금년 이후 렌더
                    this.weekendRnder(arrDates, date, i);
                }
                else {
                    if (i % 7 == 6) {
                        arrDates.push("<div data-setdate disabled class=\"calendarDay sunday is-disabled\">" + date[i] + "</div>");
                    }
                    else if (i % 7 == 0) {
                        arrDates.push("<div data-setdate disabled class=\"calendarDay saturday is-disabled\">" + date[i] + "</div>");
                    }
                    else {
                        arrDates.push("<div data-setdate disabled class=\"calendarDay is-disabled\">" + date[i] + "</div>");
                    }
                }
            }
            else {
                if (i % 7 == 6) {
                    if (this.weekend) {
                        arrDates.push("<div data-setdate disabled class=\"calendarDay sunday is-disabled\">" + date[i] + "</div>");
                    }
                    else {
                        arrDates.push("<div data-setdate class=\"calendarDay " + empty + " sunday\"> " + date[i] + "</div>");
                    }
                }
                else if (i % 7 == 0) {
                    if (this.weekend) {
                        arrDates.push("<div data-setdate disabled class=\"calendarDay saturday is-disabled\">" + date[i] + "</div>");
                    }
                    else {
                        arrDates.push("<div data-setdate class=\"calendarDay " + empty + " saturday\">" + date[i] + "</div>");
                    }
                }
                else {
                    arrDates.push("<div data-setdate class=\"calendarDay " + empty + " \">" + date[i] + "</div>");
                }
            }
        }
        arrDates.push('</div>');
        console.log(calendarBody);
        calendarBody.innerHTML = arrDates.join('');
        this.setDate();
    };
    CreatCalendar.prototype.setDate = function () {
        var _this = this;
        var setdateElms = document.querySelectorAll('[data-setdate]');
        setdateElms.forEach(function (setdateElm) {
            setdateElm.addEventListener('click', function () {
                var day = setdateElm.innerText;
                if (day < 10)
                    day = 0 + day;
                if (setdateElm.attributes['disabled']) {
                    setdateElm.classList.add("is-disabled");
                }
                else {
                    day == 0 ? _this.inputDate.value = '' : _this.inputDate.value = _this.yearElm.value + _this.monthElm.value + day;
                }
            });
        });
    };
    return CreatCalendar;
}());
var PushingParen = /** @class */ (function (_super) {
    __extends(PushingParen, _super);
    function PushingParen(paren) {
        var _this = _super.call(this, paren.inputDate, paren.weekend, paren.disabled) || this;
        _this.paren = paren;
        return _this;
    }
    //초기 컨데이너 렌더링
    PushingParen.prototype.setParentLayout = function (calendarElm) {
        var calendarLayout = [];
        calendarLayout.push("<div data-controller></div>");
        calendarLayout.push("<div data-weekdays class='weekdays'></div>");
        calendarLayout.push("<div data-calendarBody></div>");
        calendarElm.innerHTML = calendarLayout.join('');
    };
    PushingParen.prototype.controllersRender = function (lang) {
        var controller = document.querySelector("[data-controller]");
        var arrControllers = [];
        arrControllers.push("<button type=\"button\" data-calendarNation='pre'> < </button>");
        arrControllers.push("<input data-year data-calendarNation='year' type='number' value=''/>");
        arrControllers.push("<select data-month name='' data-calendarNation='month'></select>");
        arrControllers.push("<button type=\"button\" data-calendarNation='next'> > </button>");
        controller.innerHTML = arrControllers.join('');
        var yearElm = document.querySelector('[data-year]');
        var monthElm = document.querySelector('[data-month]');
        yearElm.value = this.paren.year;
        var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        for (var i = 0; i < months.length; i++) {
            var monthElm_1 = document.querySelector('[data-month]');
            var option = document.createElement('option');
            option.value = months[i];
            if (this.paren.lang == 'ko') {
                option.text = months[i] + "\uC6D4";
            }
            else if (this.paren.lang == 'ja') {
                option.text = months[i] + "\u6708";
            }
            else {
                option.text = "" + months[i];
            }
            monthElm_1.appendChild(option);
        }
        monthElm.value = this.paren.month;
    };
    PushingParen.prototype.setDays = function () {
        var _this = this;
        var langs = {
            en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            ko: ['일', '월', '화', '수', '목', '금', '토'],
            ja: ['日', '月', '火', '水', '木', '金', '土'],
        };
        Object.keys(langs).forEach(function (key, i) {
            var arrDays = [];
            var weekdays = document.querySelector("[data-weekdays]");
            if (_this.paren.lang) {
                for (var i_1 = 0; i_1 < langs[_this.paren.lang].length; i_1++) {
                    arrDays.push("<div class='weekdayItem'>" + langs[_this.paren.lang][i_1] + "</div>");
                }
            }
            else {
                for (var i_2 = 0; i_2 < langs['en'].length; i_2++) {
                    arrDays.push("<div class='weekdayItem'>" + langs['en'][i_2] + "</div>");
                }
            }
            weekdays.innerHTML = arrDays.join('');
        });
    };
    return PushingParen;
}(CreatCalendar));
var Nation = /** @class */ (function (_super) {
    __extends(Nation, _super);
    function Nation(inputDate, weekend, disabled) {
        return _super.call(this, inputDate, weekend, disabled) || this;
    }
    Nation.prototype.changeMonth = function (year, month) {
        var _this = this;
        var calendarNations = document.querySelectorAll('[data-calendarNation]');
        calendarNations.forEach(function (calendarNation) {
            calendarNation.addEventListener('click', function () {
                var nationVal = calendarNation.getAttribute('data-calendarNation');
                switch (nationVal) {
                    case 'pre':
                        month--;
                        if (month == 0) {
                            year = year - 1;
                            month = month = 12;
                        }
                        break;
                    case 'next':
                        month++;
                        if (month == 13) {
                            year = year + 1;
                            month = 1;
                        }
                        break;
                    default:
                        break;
                }
                _this.dateWatch(year, month);
                _this.changeYearMonth(year, month);
            });
            calendarNation.addEventListener('change', function () {
                year = parseInt(_this.yearElm.value);
                month = parseInt(_this.monthElm.value);
                _this.dateWatch(year, month);
            });
        });
    };
    Nation.prototype.dateWatch = function (year, month) {
        this.yearElm.value = year;
        this.monthElm.value = month;
        this.changeYearMonth(year, month);
    };
    return Nation;
}(CreatCalendar));
var ThunderDatePicker = /** @class */ (function () {
    // public renderCrrent
    // public nation
    function ThunderDatePicker(paren, option, nation, creatCalendar) {
        this.paren = paren;
        this.option = option;
        this.nation = nation;
        this.creatCalendar = creatCalendar;
        this.currentDate = new CurrentDate();
        this.showcalendarnew = new Showcalendar(this.paren, this.option.inputDate);
        this.pushingParen = new PushingParen({
            lang: this.option.lang,
            months: this.option.months,
            year: this.currentDate.get().year,
            month: this.currentDate.get().month,
            disabled: this.option.disabled
        });
    }
    ThunderDatePicker.prototype.renderElements = function () {
        this.pushingParen.setParentLayout(this.paren);
        this.pushingParen.controllersRender(this.option.lang);
        this.pushingParen.setDays();
    };
    ThunderDatePicker.prototype.renderDays = function () {
        this.nation = new Nation(this.option.inputDate, this.option.weekend, this.option.disabled);
        this.creatCalendar = new CreatCalendar(this.option.inputDate, this.option.weekend, this.option.disabled);
        this.nation.changeMonth(this.currentDate.get().year, this.currentDate.get().month);
        this.creatCalendar.changeYearMonth(this.currentDate.get().year, this.currentDate.get().month);
    };
    ThunderDatePicker.prototype.calendarToggle = function () {
        this.showcalendarnew.calendarDisplay();
    };
    ThunderDatePicker.prototype.init = function () {
        this.renderElements();
        this.calendarToggle();
        this.renderDays();
    };
    return ThunderDatePicker;
}());
exports.ThunderDatePicker = ThunderDatePicker;
// export class Test {
//   constructor(public value: string) {
//   }
//   setVal() {
//     return this.value
//   }
// }
