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
var RenderCrrent = /** @class */ (function () {
    function RenderCrrent(inputDate, weekend, disabled) {
        this.inputDate = inputDate;
        this.weekend = weekend;
        this.disabled = disabled;
        this.yearElm = document.querySelector('[data-year]');
        this.monthElm = document.querySelector('[data-month]');
    }
    Object.defineProperty(RenderCrrent.prototype, "calendarElm", {
        get: function () {
            return { year: this.yearElm, month: this.monthElm };
        },
        enumerable: false,
        configurable: true
    });
    RenderCrrent.prototype.checkLeapYear = function (year) {
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
    RenderCrrent.prototype.getFirstDayOfWeek = function (year, month) {
        if (month < 10)
            month = '0' + month;
        return (new Date(year + '-' + month + '-01')).getDay();
    };
    RenderCrrent.prototype.getLastDayOfweek = function (year, month) {
        return new Date(year, month + 1, 0).getDay();
    };
    RenderCrrent.prototype.getCurrentDate = function () {
        return {
            year: new Date().getFullYear(),
            month: (new Date().getMonth() + 1),
            day: new Date().getDate()
        };
    };
    RenderCrrent.prototype.changeYearMonth = function (year, month) {
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
    RenderCrrent.prototype.renderDate = function (date, calendarBody, year, month) {
        var arrDates = [];
        for (var i = 0; i < date.length; i++) {
            if (i == 0) {
                arrDates.push("<div class='calendarRow'>");
            }
            else if (i % 7 == 0) {
                arrDates.push("</div>");
                arrDates.push("<div class='calendarRow'>");
            }
            // 일요일
            if (i % 7 == 0) {
                if (this.weekend) {
                    arrDates.push("<div data-setdate disabled class=\"calendarDay saturday is-disabled\">" + date[i] + "</div>");
                }
                else {
                    arrDates.push("<div data-setdate class=\"calendarDay workday saturday\">" + date[i] + "</div>");
                }
                // 토요일
            }
            else if (i % 7 == 6) {
                if (this.weekend) {
                    arrDates.push("<div data-setdate disabled class=\"calendarDay sunday is-disabled\">" + date[i] + "</div>");
                }
                else {
                    arrDates.push("<div data-setdate class=\"calendarDay workday sunday\"> " + date[i] + "</div>");
                }
            }
            else {
                if (this.disabled) {
                    // 지금 년수 보다 선택된 년수가 크거나 같을경우
                    // 선택된년수가 현재 년수 보다 작으면 선택 불가
                    if (year < this.getCurrentDate().year) {
                        arrDates.push("<div data-setdate class=\"calendarDay is-disabled\">" + date[i] + "</div>");
                    }
                    else {
                        // 선택된년수가 현재 년수 보다 작으면 선택 불가
                        if (month < this.getCurrentDate().month) {
                            arrDates.push("<div data-setdate class=\"calendarDay is-disabled\">" + date[i] + "</div>");
                        }
                        else {
                            arrDates.push("<div data-setdate class=\"calendarDay\">" + date[i] + "</div>");
                        }
                    }
                    // if(year <= this.getCurrentDate().year && month < this.getCurrentDate().month) {
                    //   arrDates.push(`<div data-setdate class="calendarDay is-disabled">${date[i]}</div>`)
                    //   if(year < this.getCurrentDate().year){
                    //     arrDates.push(`<div data-setdate class="calendarDay is-disabled">${date[i]}</div>`)
                    //   }
                    // } else {
                    //   arrDates.push(`<div data-setdate class="calendarDay">${date[i]}</div>`)
                    // }
                    // if(this.getCurrentDate().year >= this.yearElm.value ) {
                    //   if (this.getCurrentDate().month > this.monthElm.value) {
                    //     console.log(i)
                    //     arrDates.push(`<div data-setdate class="calendarDay is-disabled">${date[i]}</div>`)
                    //   } else {
                    //     arrDates.push(`<div data-setdate class="calendarDay">${date[i]}</div>`)
                    //   }
                    // } else {
                    //   arrDates.push(`<div data-setdate class="calendarDay">${date[i]}</div>`)
                    // }
                }
                else {
                    arrDates.push("<div data-setdate class=\"calendarDay workday\">" + date[i] + "</div>");
                }
                // 현재년수 보다 선택된 년수 가 크면 디새이블
                // if(i > this.getCurrentDate().day) {
                //   arrDates.push(`<div data-setdate class="calendarDay">${date[i]}</div>`)
                // } else {
                //   arrDates.push(`<div data-setdate class="calendarDay workday is-disabled">${date[i]}</div>`)
                // }
            }
        }
        arrDates.push('</div>');
        calendarBody.innerHTML = arrDates.join('');
        this.setDate();
    };
    RenderCrrent.prototype.setDate = function () {
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
                    setTimeout(function () {
                        _this.inputDate.value = _this.yearElm.value + _this.monthElm.value + day;
                    }, 100);
                }
            });
        });
    };
    return RenderCrrent;
}());
var PushingParen = /** @class */ (function (_super) {
    __extends(PushingParen, _super);
    function PushingParen(lang, months, year, month, disabled, inputDate, weekend) {
        var _this = _super.call(this, inputDate, weekend, disabled) || this;
        _this.lang = lang;
        _this.months = months;
        _this.year = year;
        _this.month = month;
        return _this;
    }
    PushingParen.prototype.setParentLayout = function (calendarElm) {
        var calendarLayout = [];
        calendarLayout.push("<div data-controller></div>");
        calendarLayout.push("<div data-weekdays class='weekdays'></div>");
        calendarLayout.push("<div data-calendarBody></div>");
        calendarElm.innerHTML = calendarLayout.join('');
    };
    PushingParen.prototype.controllersRender = function () {
        var _this = this;
        var controller = document.querySelector("[data-controller]");
        var arrControllers = [];
        arrControllers.push("<button type=\"button\" data-calendarNation='pre'> < </button>");
        arrControllers.push("<input data-year data-calendarNation='year' type='number' value=''/>");
        arrControllers.push("<select data-month name='' data-calendarNation='month'></select>");
        arrControllers.push("<button type=\"button\" data-calendarNation='next'> > </button>");
        controller.innerHTML = arrControllers.join('');
        var yearElm = document.querySelector('[data-year]');
        var monthElm = document.querySelector('[data-month]');
        yearElm.value = this.year;
        setTimeout(function () {
            var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            for (var i = 0; i < months.length; i++) {
                var monthElm_1 = document.querySelector('[data-month]');
                var option = document.createElement('option');
                option.value = months[i];
                option.text = months[i] + "\uC6D4";
                monthElm_1.appendChild(option);
            }
            monthElm.value = _this.month;
        }, 100);
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
            if (_this.lang) {
                for (var i_1 = 0; i_1 < langs[_this.lang].length; i_1++) {
                    arrDays.push("<div class='weekdayItem'>" + langs[_this.lang][i_1] + "</div>");
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
}(RenderCrrent));
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
                year = parseInt(_this.calendarElm.year.value);
                month = parseInt(_this.calendarElm.month.value);
                _this.dateWatch(year, month);
            });
        });
    };
    Nation.prototype.dateWatch = function (year, month) {
        this.calendarElm.year.value = year;
        this.calendarElm.month.value = month;
        this.changeYearMonth(year, month);
    };
    return Nation;
}(RenderCrrent));
var ThunderDatePicker = /** @class */ (function () {
    function ThunderDatePicker(paren, option) {
        this.paren = paren;
        this.option = option;
    }
    ThunderDatePicker.prototype.pushingParen = function () {
        var pushingParen = new PushingParen(this.option.lang, this.option.months, this.option.year, this.option.month, this.option.disabled);
        pushingParen.setParentLayout(this.paren);
        pushingParen.controllersRender();
        pushingParen.setDays();
    };
    ThunderDatePicker.prototype.renderDays = function () {
        var renderCrrent = new RenderCrrent(this.option.inputDate, this.option.weekend, this.option.disabled);
        var nation = new Nation(this.option.inputDate, this.option.weekend, this.option.disabled);
        nation.changeMonth(this.option.year, this.option.month);
        renderCrrent.changeYearMonth(this.option.year, this.option.month);
    };
    ThunderDatePicker.prototype.calendarToggle = function () {
        var showcalendarnew = new Showcalendar(this.paren, this.option.inputDate);
        showcalendarnew.calendarDisplay();
    };
    ThunderDatePicker.prototype.init = function () {
        this.pushingParen();
        this.calendarToggle();
        this.renderDays();
    };
    return ThunderDatePicker;
}());
exports.ThunderDatePicker = ThunderDatePicker;
