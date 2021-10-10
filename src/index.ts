class Showcalendar {
  constructor(private calendar:Element, private inputDate: HTMLInputElement) {
  }
  calendarDisplay() {
    this.inputDate.addEventListener('click', () =>{
      this.calendar.classList.toggle('is-show')
    })
  }
}

class CurrentDate {
  constructor() {}
  public get(): {[key:string]: number} {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    }
  }
}

class CreatCalendar {
  public yearElm: any
  public monthElm: any
  public currentDate
  constructor(
    private inputDate?: any, 
    private weekend?:boolean, 
    private disabled?:boolean,
    private minDate?: number,
    private maxDate?: number,

  ) {
    this.yearElm = document.querySelector('[data-year]')
    this.monthElm = document.querySelector('[data-month]')
    this.currentDate = new CurrentDate()
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
    this.renderDate(arrCalender, calendarBody, year, month)
  }
  // 주말 표시
  private weekendRnder(arrDates: string[], date: any, i:number) {
    if(i%7 == 6) {
      arrDates.push(`<div data-setdate disabled class="calendarDay sunday is-disabled">${date[i]}</div>`)
    } else if(i%7 == 0) {
      arrDates.push(`<div data-setdate disabled class="calendarDay saturday is-disabled">${date[i]}</div>`)
    } else {
      arrDates.push(`<div data-setdate class="calendarDay">${date[i]}</div>`)
    }
  }
  private renderDate(date: any, calendarBody: Element, year: number , month: number): void {
    let arrDates = []
    for (let i = 0; i <date.length; i++) {
      const empty = date[i] == `` ? `empty`: `workday`
      if(i == 0) {
        arrDates.push(`<div class='calendarRow'>`)
      } else if(i%7 == 0) {
        arrDates.push(`</div>`)
        arrDates.push(`<div class='calendarRow'>`)
      }
      if(this.disabled) {
        console.log(this.minDate)
        if( year == this.currentDate.get().year && 
            month == this.currentDate.get().month && 
            date[i] >= this.currentDate.get().day
          ) {
          // 금년 당월 당일 이후 렌더
          
          this.weekendRnder(arrDates, date, i)
        } else if(year < this.currentDate.get().year && month < this.currentDate.get().month) {
          // 금년 이전 당월 이전 렌더
          arrDates.push(`<div data-setdate disabled class="calendarDay is-disabled">${date[i]}</div>`)
        } else if(year < this.currentDate.get().year) {
          // 금년 이전 렌더
          arrDates.push(`<div data-setdate disabled class="calendarDay is-disabled">${date[i]}</div>`)
        } else if(month > this.currentDate.get().month) {
          // 당월 이후 렌더
          this.weekendRnder(arrDates, date, i)
        } else if(year > this.currentDate.get().year) {
          // 금년 이후 렌더
          this.weekendRnder(arrDates, date, i)
        } else {
          if(i%7 == 6) {
            arrDates.push(`<div data-setdate disabled class="calendarDay sunday is-disabled">${date[i]}</div>`)
          } else if(i%7 == 0){
            arrDates.push(`<div data-setdate disabled class="calendarDay saturday is-disabled">${date[i]}</div>`)
          } else {
            arrDates.push(`<div data-setdate disabled class="calendarDay is-disabled">${date[i]}</div>`)
          }
        }
      } else {
        if(i%7 == 6) {
          if(this.weekend) {
            arrDates.push(`<div data-setdate disabled class="calendarDay sunday is-disabled">${date[i]}</div>`)
          } else {
            arrDates.push(`<div data-setdate class="calendarDay ${empty} sunday"> ${date[i]}</div>`)
          }
        } else if(i%7 == 0){
          if(this.weekend) {
            arrDates.push(`<div data-setdate disabled class="calendarDay saturday is-disabled">${date[i]}</div>`)
          } else {
            arrDates.push(`<div data-setdate class="calendarDay ${empty} saturday">${date[i]}</div>`)
          }
        } else {
          arrDates.push(`<div data-setdate class="calendarDay ${empty} ">${date[i]}</div>`)
        }
      }
    }
    arrDates.push('</div>')
    console.log(calendarBody)
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
          day == 0 ? this.inputDate.value = '': this.inputDate.value = this.yearElm.value + this.monthElm.value + day
        }
      })
    });
  }
}

class PushingParen extends CreatCalendar{
  constructor(
    private paren: {
      lang: string, 
      months: string[], 
      year: number, 
      month: number, 
      disabled: boolean,
      inputDate?: HTMLInputElement, 
      weekend?:boolean
    }) {
    super(paren.inputDate, paren.weekend, paren.disabled)
  }
  //초기 컨데이너 렌더링
  public setParentLayout(calendarElm: HTMLElement){
    let calendarLayout = []
    calendarLayout.push(`<div data-controller></div>`)
    calendarLayout.push(`<div data-weekdays class='weekdays'></div>`)
    calendarLayout.push(`<div data-calendarBody></div>`)
    calendarElm.innerHTML = calendarLayout.join('')
  }
  public controllersRender(lang?: string) {
    const controller = document.querySelector(`[data-controller]`) as HTMLElement
    const arrControllers = []
    arrControllers.push(`<button type="button" data-calendarNation='pre'> < </button>`)
    arrControllers.push(`<input data-year data-calendarNation='year' type='number' value=''/>`)
    arrControllers.push(`<select data-month name='' data-calendarNation='month'></select>`)
    arrControllers.push(`<button type="button" data-calendarNation='next'> > </button>`)
    controller.innerHTML = arrControllers.join('')
    const yearElm:any  = document.querySelector('[data-year]')
    const monthElm: any = document.querySelector('[data-month]')
    yearElm.value = this.paren.year
    const months:any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    for (let i = 0; i < months.length; i++) {
      const monthElm:any = document.querySelector('[data-month]')
      let option = document.createElement('option')
      option.value = months[i]
      if(this.paren.lang == 'ko') {
        option.text = `${months[i]}월`
      } else if(this.paren.lang == 'ja'){
        option.text = `${months[i]}月`
      } else {
        option.text = `${months[i]}`
      }
      monthElm.appendChild(option);
    }
    monthElm.value = this.paren.month
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
      if(this.paren.lang) {
        for (let i = 0; i < langs[this.paren.lang].length; i++) {
          arrDays.push(`<div class='weekdayItem'>${langs[this.paren.lang][i]}</div>`)
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

class Nation extends CreatCalendar{
  constructor(inputDate: HTMLInputElement, weekend:boolean, disabled: boolean) {
    super(inputDate, weekend, disabled)
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
        year = parseInt(this.yearElm.value)
        month = parseInt(this.monthElm.value)
        this.dateWatch(year, month)
      })
    })
  }
  dateWatch(year: number, month:number): void {
    this.yearElm.value = year
    this.monthElm.value = month
    this.changeYearMonth(year, month)
  }
}


type option = {
  inputDate: HTMLInputElement 
  disabled: boolean
  year: number 
  month: number
  today: number
  weekend:boolean
  lang: string
  months: string[]
  minDate: number
  maxDate: number
}

export class ThunderDatePicker {
  public currentDate
  public showcalendarnew
  public pushingParen
  // public renderCrrent
  // public nation
  constructor(
    private paren: HTMLElement, 
    private option: option, 
    public nation: any, 
    public creatCalendar: any
    ) {
      this.currentDate = new CurrentDate()
      this.showcalendarnew = new Showcalendar(this.paren, this.option.inputDate)
      this.pushingParen = new PushingParen({
        lang: this.option.lang, 
        months :this.option.months, 
        year: this.currentDate.get().year, 
        month: this.currentDate.get().month,
        disabled: this.option.disabled
      })}
      renderElements() {
        this.pushingParen.setParentLayout(this.paren)
        this.pushingParen.controllersRender(this.option.lang)
        this.pushingParen.setDays()
      }
      
    renderDays() {
      this.nation = new Nation(this.option.inputDate, this.option.weekend, this.option.disabled)
      this.creatCalendar = new CreatCalendar(
        this.option.inputDate, 
        this.option.weekend,  
        this.option.disabled, 
        this.option.minDate,
        this.option.maxDate,
      )
      this.nation.changeMonth( this.currentDate.get().year, this.currentDate.get().month
      )
      this.creatCalendar.changeYearMonth(
        this.currentDate.get().year, this.currentDate.get().month
      )
    }
  calendarToggle() {
    this.showcalendarnew.calendarDisplay();
  }
  init() {
    this.renderElements()
    this.calendarToggle()
    this.renderDays()
  }
}
