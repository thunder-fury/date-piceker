"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThunderDatePicker = void 0;
var ThunderDatePicker = /** @class */ (function () {
    function ThunderDatePicker(current) {
        this.current = current;
    }
    ThunderDatePicker.prototype.checkLeapYear = function (year) {
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
    ThunderDatePicker.prototype.getFirstDayOfWeek = function (year, month) {
        if (month < 10)
            month = '0' + month;
        return (new Date(year + '-' + month + '-01')).getDay();
    };
    ThunderDatePicker.prototype.changeYearMonth = function (year, month) {
        var monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var firstDayOfWeek = this.getFirstDayOfWeek(year, month);
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
        this.renderCalendar(arrCalender, this.current.body);
    };
    ThunderDatePicker.prototype.renderCalendar = function (data, currentBody) {
        var h = [];
        for (var i = 0; i < data.length; i++) {
            if (i == 0) {
                h.push("<div class='currentRow'>");
            }
            else if (i % 7 == 0) {
                h.push("</div>");
                h.push("<div class='currentRow'>");
            }
            if (i % 7 == 0) {
                if (this.current.weekend) {
                    h.push('<div data-setdate disabled class="currentDay saturday is-disabled">' + data[i] + '</div>');
                }
                else {
                    h.push('<div data-setdate class="currentDay workday saturday">' + data[i] + '</div>');
                }
            }
            else if (i % 7 == 6) {
                if (this.current.weekend) {
                    h.push('<div data-setdate disabled class="currentDay sunday is-disabled">' + data[i] + '</div>');
                }
                else {
                    h.push('<div data-setdate class="currentDay workday sunday">' + data[i] + '</div>');
                }
            }
            else {
                h.push('<div data-setdate class="currentDay workday">' + data[i] + '</div>');
            }
        }
        h.push('</div>');
        currentBody.innerHTML = h.join('');
        this.setDate();
    };
    ThunderDatePicker.prototype.changeMonth = function (currentNations, currentYear, currentMonth) {
        var _this = this;
        currentNations.forEach(function (currentNation) {
            currentNation.addEventListener('click', function () {
                var nationVal = currentNation.getAttribute('data-currentNation');
                switch (nationVal) {
                    case 'pre':
                        currentMonth--;
                        if (currentMonth == 0) {
                            currentYear = currentYear - 1;
                            currentMonth = currentMonth = 12;
                        }
                        break;
                    case 'next':
                        currentMonth++;
                        if (currentMonth == 13) {
                            currentYear = currentYear + 1;
                            currentMonth = 1;
                        }
                        break;
                    default:
                        break;
                }
                _this.dateWatch(currentYear, currentMonth);
                _this.changeYearMonth(currentYear, currentMonth);
            });
            currentNation.addEventListener('change', function () {
                currentYear = parseInt(_this.current.yearElm.value);
                currentMonth = parseInt(_this.current.monthElm.value);
                _this.dateWatch(currentYear, currentMonth);
            });
        });
    };
    ThunderDatePicker.prototype.dateWatch = function (currentYear, currentMonth) {
        this.current.yearElm.value = currentYear;
        this.current.monthElm.value = currentMonth;
        this.changeYearMonth(currentYear, currentMonth);
    };
    ThunderDatePicker.prototype.setDate = function () {
        var _this = this;
        setTimeout(function () {
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
                        _this.current.inputdateElm.value = _this.current.yearElm.value + _this.current.monthElm.value + Number(day);
                    }
                });
            });
        }, 500);
    };
    ThunderDatePicker.prototype.init = function () {
        this.current.yearElm.value = this.current.year;
        this.current.monthElm.value = this.current.month;
        this.changeYearMonth(this.current.year, this.current.month);
        this.changeMonth(this.current.nation, this.current.year, this.current.month);
        this.display(this.current.inputdateElm);
    };
    ThunderDatePicker.prototype.display = function (elm) {
        var thunderFuryDatePicker = document.querySelector('.thunderFury-datePicker');
        if (thunderFuryDatePicker) {
            elm.addEventListener('click', function () {
                thunderFuryDatePicker.classList.toggle('is-show');
            });
        }
    };
    return ThunderDatePicker;
}());
exports.ThunderDatePicker = ThunderDatePicker;
