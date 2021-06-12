class Showcalendar {
  constructor(private calendar:Element, private inputDate: HTMLInputElement) {
  }
  calendarDisplay() {
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

  get calendarElm(): any {
    return { year: this.yearElm, month: this.monthElm }
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

  private getCurrentDate() {
    return { 
      year: new Date().getFullYear(), 
      month: (new Date().getMonth() + 1), 
      day: new Date().getDate()
    }
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
    this.renderDate(arrCalender, calendarBody, year, month)
  }

  private renderDate(date: any, calendarBody: Element, year: number , month: number): void {
    let arrDates = []
    for (let i = 0; i <date.length; i++) {
      if(i == 0) {
        arrDates.push(`<div class='calendarRow'>`)
      }else if(i%7 == 0) {
        arrDates.push(`</div>`)
        arrDates.push(`<div class='calendarRow'>`)
      } 
      // 일요일
      if(i%7 == 0) {
        if(this.weekend) {
          arrDates.push(`<div data-setdate disabled class="calendarDay saturday is-disabled">${date[i]}</div>`)
        } else {
          arrDates.push(`<div data-setdate class="calendarDay workday saturday">${date[i]}</div>`)
        }
      // 토요일
      } else if(i%7 == 6) {
        if(this.weekend) {
          arrDates.push(`<div data-setdate disabled class="calendarDay sunday is-disabled">${date[i]}</div>`)
        } else {
          arrDates.push(`<div data-setdate class="calendarDay workday sunday"> ${date[i]}</div>`)
        }
      } else {
        if(!this.getCurrentDate().year) {
          arrDates.push(`<div data-setdate class="calendarDay is-disabled">${date[i]}</div>`)
        } else {
          arrDates.push(`<div data-setdate class="calendarDay workday">${date[i]}</div>`)
        }
        // if(i > this.getCurrentDate().day) {
        //   arrDates.push(`<div data-setdate class="calendarDay">${date[i]}</div>`)
        // } else {
        //   arrDates.push(`<div data-setdate class="calendarDay workday is-disabled">${date[i]}</div>`)
        // }
      }
    }
    arrDates.push('</div>')
    calendarBody.innerHTML = arrDates.join('')
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
  constructor( 
    private lang: string, 
    private months: string[], 
    private year: number, 
    private month: number, 
    inputDate?: HTMLInputElement, 
    weekend?:boolean,) {
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
    arrControllers.push(`<input data-year data-calendarNation='year' type='number' value=''/>`)
    arrControllers.push(`<select data-month name='' data-calendarNation='month'></select>`)
    arrControllers.push(`<button type="button" data-calendarNation='next'> > </button>`)
    controller.innerHTML = arrControllers.join('')
    const yearElm:any  = document.querySelector('[data-year]')
    const monthElm: any = document.querySelector('[data-month]')
    yearElm.value = this.year
    setTimeout(() => {
      const months:any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      for (let i = 0; i < months.length; i++) {
        const monthElm:any = document.querySelector('[data-month]')
        let option = document.createElement('option')
        option.value = months[i]
        option.text = `${months[i]}월`
        monthElm.appendChild(option);
      }
      monthElm.value = this.month
    }, 100);
  }
  
  public setDays() {
    const langs:any = {
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      ko: ['일', '월', '화', '수', '목', '금', '토'],
      ja:  ['日', '月', '火', '水', '木', '金', '土'],
    }
    Object.keys(langs).forEach((key, i) => {
      let arrDays = []
      let weekdays:any = document.querySelector(`[data-weekdays]`)
      if(this.lang) {
        for (let i = 0; i < langs[this.lang].length; i++) {
          arrDays.push(`<div class='weekdayItem'>${langs[this.lang][i]}</div>`)
        }
      } else {
        for (let i = 0; i < langs['en'].length; i++) {
          arrDays.push(`<div class='weekdayItem'>${langs['en'][i]}</div>`)
        }
      }
      weekdays.innerHTML = arrDays.join('')  
    });
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
        let nationVal = calendarNation.getAttribute('data-calendarNation')
        switch (nationVal) {
          case 'pre':
            month--;
            if (month == 0) {
              year = year - 1
              month = month = 12
            }
            break
          case 'next':
            month++;
            if (month == 13) {
              year = year + 1
              month = 1
            }
            break
          default:
            break
        }
        this.dateWatch(year, month)
        this.changeYearMonth(year, month)
      })
      calendarNation.addEventListener('change', () =>{
        year = parseInt(this.calendarElm.year.value)
        month = parseInt(this.calendarElm.month.value)
        this.dateWatch(year, month)
      })
    })
  }
  dateWatch(year: number, month:number): void {
    this.calendarElm.year.value = year
    this.calendarElm.month.value = month
    this.changeYearMonth(year, month)
  }
}

export class ThunderDatePicker {
  constructor(
    private paren:HTMLElement, 
    private option:{
      inputDate: HTMLInputElement, 
      year: number, 
      month: number,
      today: number
      weekend:boolean, 
      lang: string, 
      months: string[]
    }) {
  }
  pushingParen() {
    const pushingParen = new PushingParen(this.option.lang, this.option.months, this.option.year, this.option.month)
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
