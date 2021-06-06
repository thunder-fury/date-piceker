export class ThunderDatePicker {
  current: {
    inputdateElm: any,
    yearElm: any
    monthElm: any
    year: number,
    month: number,
    nation: Element
    body: Element,
    weekend: boolean
  }
  constructor(current:{inputdateElm:any, yearElm:any, monthElm:any, year:number, month: number,  nation:Element, body:Element, weekend:boolean}) {
    this.current = current
  }
  checkLeapYear(year: number): boolean {
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

  getFirstDayOfWeek(year:number, month: string | number):number {
    if(month < 10) month = '0' + month
    return (new Date(year+'-'+month+'-01')).getDay()
  }

  changeYearMonth(year: number , month: number): void {
    let monthDay = [31,28,31,30,31,30,31,31,30,31,30,31]
    let firstDayOfWeek = this.getFirstDayOfWeek(year, month)
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
    this.renderCalendar(arrCalender, this.current.body)
  }

  renderCalendar(data: any, currentBody: Element): void {
    let h = []
    for (let i = 0; i <data.length; i++) {
      if(i == 0) {
        h.push(`<div class='currentRow'>`)
      }else if(i%7 == 0) {
        h.push(`</div>`)
        h.push(`<div class='currentRow'>`)
      } 
      if(i%7 == 0) {
        if(this.current.weekend) {
          h.push('<div data-setdate disabled class="currentDay saturday is-disabled">' + data[i] + '</div>')
        } else {
          h.push('<div data-setdate class="currentDay workday saturday">' + data[i] + '</div>')
        }
      } else if(i%7 == 6) {
        if(this.current.weekend) {
          h.push('<div data-setdate disabled class="currentDay sunday is-disabled">' + data[i] + '</div>')
        } else {
          h.push('<div data-setdate class="currentDay workday sunday">' + data[i] + '</div>')
        }
      } else {
        h.push('<div data-setdate class="currentDay workday">' + data[i] + '</div>')
      }
    }
    h.push('</div>')
    currentBody.innerHTML = h.join('')
    this.setDate()
  }
  
  changeMonth(currentNations: any, currentYear: number, currentMonth: number): void {
    currentNations.forEach((currentNation:Element) => {
      currentNation.addEventListener('click', () => {
        let nationVal = currentNation.getAttribute('data-currentNation');
        switch (nationVal) {
          case 'pre':
            currentMonth--;
            if (currentMonth == 0) {
              currentYear = currentYear - 1;
              currentMonth = currentMonth = 12;
            }
            break
          case 'next':
            currentMonth++;
            if (currentMonth == 13) {
              currentYear = currentYear + 1;
              currentMonth = 1;
            }
            break
          default:
          break
        }
        this.dateWatch(currentYear, currentMonth)
        this.changeYearMonth(currentYear, currentMonth);
      })
      currentNation.addEventListener('change', () =>{
        currentYear = parseInt(this.current.yearElm.value)
        currentMonth = parseInt(this.current.monthElm.value)
        this.dateWatch(currentYear, currentMonth)
      })
    })
  }

  dateWatch(currentYear: number, currentMonth:number): void {
    this.current.yearElm.value = currentYear;
    this.current.monthElm.value = currentMonth;
    this.changeYearMonth(currentYear, currentMonth);
  }

  setDate(): void {
    setTimeout(() => {
      let setdateElms = document.querySelectorAll('[data-setdate]')
      setdateElms.forEach((setdateElm: any) => {
        setdateElm.addEventListener('click', () => {
          let day: number = setdateElm.innerText
          if(day<10) day = 0 + day
          if(setdateElm.attributes['disabled']) {
            setdateElm.classList.add("is-disabled")
          } else {
            this.current.inputdateElm.value = this.current.yearElm.value + this.current.monthElm.value + Number(day)
          }
        })
      });
    }, 500)
  }

  init() {
    this.current.yearElm.value = this.current.year
    this.current.monthElm.value = this.current.month;
    this.changeYearMonth(this.current.year, this.current.month)
    this.changeMonth(this.current.nation, this.current.year, this.current.month)
    this.display(this.current.inputdateElm)
  }
  
  display(elm:Element) {
    let thunderFuryDatePicker: any = document.querySelector('.thunderFury-datePicker')
    if(thunderFuryDatePicker) {
      elm.addEventListener('click', () =>{
        thunderFuryDatePicker.classList.toggle('is-show')
      })
    }
  }
}
