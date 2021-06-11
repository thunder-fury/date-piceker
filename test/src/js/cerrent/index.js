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
        console.log(this.calendar);
        this.inputDate.addEventListener('click', function () {
            _this.calendar.classList.toggle('is-show');
        });
    };
    return Showcalendar;
}());
var RenderCrrent = /** @class */ (function () {
    function RenderCrrent(inputDate, weekend) {
        this.inputDate = inputDate;
        this.weekend = weekend;
        this.yearElm = document.querySelector('[data-year]');
        this.monthElm = document.querySelector('[data-month]');
    }
    Object.defineProperty(RenderCrrent.prototype, "calendar", {
        get: function () {
            return { yearElm: this.yearElm, monthElm: this.monthElm };
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
        this.renderCalendar(arrCalender, calendarBody);
    };
    RenderCrrent.prototype.renderCalendar = function (date, calendarBody) {
        var h = [];
        for (var i = 0; i < date.length; i++) {
            if (i == 0) {
                h.push("<div class='calendarRow'>");
            }
            else if (i % 7 == 0) {
                h.push("</div>");
                h.push("<div class='calendarRow'>");
            }
            // 일요일
            if (i % 7 == 0) {
                if (this.weekend) {
                    h.push('<div data-setdate disabled class="calendarDay saturday is-disabled">' + date[i] + '</div>');
                }
                else {
                    h.push('<div data-setdate class="calendarDay workday saturday">' + date[i] + '</div>');
                }
                // 토요일
            }
            else if (i % 7 == 6) {
                if (this.weekend) {
                    h.push('<div data-setdate disabled class="calendarDay sunday is-disabled">' + date[i] + '</div>');
                }
                else {
                    h.push('<div data-setdate class="calendarDay workday sunday">' + date[i] + '</div>');
                }
            }
            else {
                h.push('<div data-setdate class="calendarDay workday">' + date[i] + '</div>');
            }
        }
        h.push('</div>');
        calendarBody.innerHTML = h.join('');
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
                    }, 500);
                }
            });
        });
    };
    return RenderCrrent;
}());
var PushingParen = /** @class */ (function () {
    function PushingParen(days, months) {
        this.days = days;
        this.months = months;
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
        setTimeout(function () {
            for (var i = 0; i < _this.months.length; i++) {
                var monthElm = document.querySelector('[data-month]');
                var option = document.createElement('option');
                option.value = _this.months[i];
                option.text = _this.months[i] + "\uC6D4";
                monthElm.appendChild(option);
            }
        }, 500);
    };
    PushingParen.prototype.setDays = function () {
        var arrDays = [];
        var days = document.querySelector("[data-weekdays]");
        for (var i = 0; i < this.days.length; i++) {
            arrDays.push("<div class='weekdayItem'>" + this.days[i] + "</div>");
        }
        days.innerHTML = arrDays.join('');
    };
    return PushingParen;
}());
var Nation = /** @class */ (function (_super) {
    __extends(Nation, _super);
    function Nation(inputDate, weekend) {
        return _super.call(this, inputDate, weekend) || this;
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
                            year = month = 12;
                        }
                        break;
                    case 'next':
                        month++;
                        if (month == 13) {
                            year = year + 1;
                            month = 1;
                        }
                        break;
                }
                calendarNation.addEventListener('change', function () {
                    _this.dateWatch(parseInt(_this.calendar.monthElm.value), parseInt(_this.calendar.monthElm.value));
                });
                _this.dateWatch(year, month);
                _this.changeYearMonth(year, month);
            });
        });
    };
    Nation.prototype.dateWatch = function (year, month) {
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
        var pushingParen = new PushingParen(this.option.days, this.option.months);
        pushingParen.setParentLayout(this.paren);
        pushingParen.controllersRender();
        pushingParen.setDays();
    };
    ThunderDatePicker.prototype.renderDays = function () {
        var renderCrrent = new RenderCrrent(this.option.inputDate, this.option.weekend);
        var nation = new Nation(this.option.inputDate, this.option.weekend);
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
