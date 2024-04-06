import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Week } from '../models/week.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor() { }

  getWeek(date: string = ''): Week[] {
    let week = [];
    let now = date ? moment(date) : moment();
    let startOfWeek = now.clone().startOf('week');
    
    for(let i = 0; i < 7; i++){
      let dayMoment = startOfWeek.clone().add(i, 'days');
      let dayObj = {
        day: dayMoment.format('ddd').toUpperCase(),
        fullDate: dayMoment.format('YYYY-MM-DD'),
        isToday: this.isToday(dayMoment),
        date: dayMoment.format('DD'),
        month: dayMoment.format('MMM'),
        year: dayMoment.format('YYYY'),
        isExpired: this.isExpired(dayMoment),
      };
      week.push(JSON.parse(JSON.stringify(dayObj)));
    }

    return week;
  }

  isToday(dayMoment: moment.Moment): boolean {
    let today = moment();
    return dayMoment.isSame(today, 'day');
  }

  isExpired(dayMoment: moment.Moment): boolean {
    let today = moment();
    return dayMoment.isBefore(today, 'day');
  }

  getToday(): string {
    return moment().format('YYYY-MM-DD');
  }

  getPrevious(date: string): string {
    return moment(date).subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
  }

  getNext(date: string): string {
    return moment(date).add(1, 'weeks').startOf('week').format('YYYY-MM-DD');
  }
}
