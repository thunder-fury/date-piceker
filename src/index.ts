class Showcalendar {
  constructor(private calendar:Element, private inputDate: HTMLInputElement) {
  }
  calendarDisplay() {
    console.log(this.calendar)
    this.inputDate.addEventListener('click', () =>{
      this.calendar.classList.toggle('is-show')
    })
  }
}

class RenderCrrent {
  //TODO: 型確認
  private yearElm: any
  private monthElm: any
  constructor(private inputDate?: any, private weekend?:boolean) {
    this.yearElm = document.querySelector('[data-year]')
    this.monthElm = document.querySelector('[data-month]')
  }

  get calendar(): any {
    return { yearElm: this.yearElm, monthElm: this.monthElm }
  }

  private checkLeapYear(year: number): boolean {
    // 윤년 계산
    if(year%400 == 0) {
      return true
    }else if(year%100 == 0) {
      return false
    } else if(year%4 == 0){
      return true
    } else {
      return false
    }
  }

  private getFirstDayOfWeek(year:number, month: string | number):number {
    if(month < 10) month = '0' + month
    return (new Date(year+'-'+month+'-01')).getDay()
  }
  private getLastDayOfweek(year:number, month: number):number {
    return new Date( year, month + 1, 0 ).getDay()
  }
  public changeYearMonth(year: number , month: number): void {
    let monthDay = [31,28,31,30,31,30,31,31,30,31,30,31]
    let firstDayOfWeek = this.getFirstDayOfWeek(year, month)
    let lastDayOfWeek = 7 - this.getLastDayOfweek(year, month - 1) - 1
    let arrCalender = []
    let remainDay = 7 - (arrCalender.length%7)
    
    if(month == 2) {
      if(this.checkLeapYear(year)) monthDay[1] = 29
    } 

    for (let i = 0; i < firstDayOfWeek; i++) {
      arrCalender.push('')
    }

    for (let i = 1; i <= monthDay[month-1]; i++) {
      arrCalender.push(String(i))
    }

    if(remainDay < 7) {
      for (let i = 0; i < remainDay; i++) {
        arrCalender.push('')
      }
    }

    for (let i = 0; i <= lastDayOfWeek; i++) {
      arrCalender.push('')
    }
    let calendarBody:any = document.querySelector(`[data-calendarBody]`)
    this.renderCalendar(arrCalender, calendarBody)
  }

  private renderCalendar(date: any, calendarBody: Element): void {
    let h = []
    for (let i = 0; i <date.length; i++) {
      if(i == 0) {
        h.push(`<div class='calendarRow'>`)
      }else if(i%7 == 0) {
        h.push(`</div>`)
        h.push(`<div class='calendarRow'>`)
      } 
      // 일요일
      if(i%7 == 0) {
        if(this.weekend) {
          h.push('<div data-setdate disabled class="calendarDay saturday is-disabled">' + date[i] + '</div>')
        } else {
          h.push('<div data-setdate class="calendarDay workday saturday">' + date[i] + '</div>')
        }
      // 토요일
      } else if(i%7 == 6) {
        if(this.weekend) {
          h.push('<div data-setdate disabled class="calendarDay sunday is-disabled">' + date[i] + '</div>')
        } else {
          h.push('<div data-setdate class="calendarDay workday sunday">' + date[i] + '</div>')
        }
      } else {
        h.push('<div data-setdate class="calendarDay workday">' + date[i] + '</div>')
      }
    }
    h.push('</div>')
    calendarBody.innerHTML = h.join('')
    this.setDate()
  }
  private setDate(): void {
    let setdateElms = document.querySelectorAll('[data-setdate]')
    setdateElms.forEach((setdateElm: any) => {
      setdateElm.addEventListener('click', () => {
        let day: number = setdateElm.innerText
        if(day<10) day = 0 + day
        if(setdateElm.attributes['disabled']) {
          setdateElm.classList.add("is-disabled")
        } else {
          setTimeout(() => {
            this.inputDate.value = this.yearElm.value + this.monthElm.value + day
          }, 100);
        }
      })
    });
  }
}


class PushingParen extends RenderCrrent{
  constructor( private days: string[], private months: string[], private year: number, private month: number, inputDate?: HTMLInputElement, weekend?:boolean,) {
    super(inputDate, weekend)
  }
  public setParentLayout(calendarElm: HTMLElement){
    let calendarLayout = []
    calendarLayout.push(`<div data-controller></div>`)
    calendarLayout.push(`<div data-weekdays class='weekdays'></div>`)
    calendarLayout.push(`<div data-calendarBody></div>`)
    calendarElm.innerHTML = calendarLayout.join('')
  }
  public controllersRender() {
    const controller = document.querySelector(`[data-controller]`) as HTMLElement
    const arrControllers = []
    arrControllers.push(`<button type="button" data-calendarNation='pre'> < </button>`)
    arrControllers.push(`<input data-year data-select='year' type='number' value=''/>`)
    arrControllers.push(`<select data-month name='' data-calendarNation='month'></select>`)
    arrControllers.push(`<button type="button" data-calendarNation='next'> > </button>`)
    controller.innerHTML = arrControllers.join('')

    setTimeout(() => {
      for (let i = 0; i < this.months.length; i++) {
        const monthElm:any = document.querySelector('[data-month]')
        let option = document.createElement('option')
        option.value = this.months[i]
        option.text = `${this.months[i]}월`
        monthElm.appendChild(option);
      }
      const yearElm:any  = document.querySelector('[data-year]');
      const monthElm: any = document.querySelector('[data-month]');
      yearElm.value = this.year
      monthElm.value = this.month
    }, 100);
  }
  public setDays() {
    let arrDays = []
    let days:any = document.querySelector(`[data-weekdays]`)
    for (let i = 0; i < this.days.length; i++) {
      arrDays.push(`<div class='weekdayItem'>${this.days[i]}</div>`)
    }
    days.innerHTML = arrDays.join('')  
  }
  
}


class Nation extends RenderCrrent{
  constructor(inputDate: HTMLInputElement, weekend:boolean){
    super(inputDate, weekend)
  }
  changeMonth(year: number, month: number): void {
    let calendarNations = document.querySelectorAll('[data-calendarNation]')
    calendarNations.forEach((calendarNation:Element) => {
      calendarNation.addEventListener('click', () => {
        let nationVal = calendarNation.getAttribute('data-calendarNation');
        switch (nationVal) {
          case 'pre':
            month--;
            if (month == 0) {
              year = year - 1;
              year = month = 12;
            }
            break
          case 'next':
            month++;
            if (month == 13) {
              year = year + 1;
              month = 1;
            }
            break
        }
        this.dateWatch(year, month)
        this.changeYearMonth(year, month)
      })
    })
    calendarNations.forEach(selectNation => {
      console.log(selectNation)
      selectNation.addEventListener('change', () =>{
        this.dateWatch(year, month)
        this.changeYearMonth(year, month)
      })
    });
    
  }
  dateWatch(year: number, month:number): void {
    this.calendar.yearElm.value = year;
    this.calendar.monthElm.value = month;
  }
}

export class ThunderDatePicker {
  constructor(
    private paren:HTMLElement, 
    private option:{inputDate: HTMLInputElement, year: number, month: number, weekend:boolean, days: string[], months: string[]}) {
  }
  pushingParen() {
    const pushingParen = new PushingParen(this.option.days, this.option.months, this.option.year, this.option.month)
    pushingParen.setParentLayout(this.paren)
    pushingParen.controllersRender()
    pushingParen.setDays()
  }
  
  renderDays() {
    const renderCrrent = new RenderCrrent(this.option.inputDate, this.option.weekend)
    const nation = new Nation(this.option.inputDate, this.option.weekend)
    nation.changeMonth(this.option.year, this.option.month)
    renderCrrent.changeYearMonth(this.option.year, this.option.month)
  }
  calendarToggle() {
    const showcalendarnew = new Showcalendar(this.paren, this.option.inputDate)
    showcalendarnew.calendarDisplay();
  }
  init() {
    this.pushingParen()
    this.calendarToggle()
    this.renderDays()
    
    
  }
}
