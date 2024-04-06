import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Week } from '../models/week.model';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { ToDo } from '../models/to-do.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  apiUrl = environment.apiUrl;
  todoData = new BehaviorSubject<ToDo[]>([]);

  constructor(private http: HttpClient) { }

  setToDoData(data: ToDo[]){
    this.todoData.next(data);
  }

  getData(){
    this.http.get(this.apiUrl + "/to-do-data").subscribe({
      next: (res: any) => {
        if(res["status"]) this.setToDoData(res["data"]);
      },
      error: (err) => {
        console.log("🚀 ~ ToDoService ~ this.http.get ~ err:", err);
      }
    });
  }

  getWeeklyItems(date: string): ToDo[] {
    console.log(this.todoData)
    return [];
  }

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
