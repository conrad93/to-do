import { Component, OnInit } from '@angular/core';
import { ToDo } from 'src/app/models/to-do.model';
import { Week } from 'src/app/models/week.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  
  isLoading = true;
  week: Week[] = [];
  currentDate: string = '';
  weeklyItems: ToDo[] = [];
  
  constructor(private todoService: ToDoService){}

  ngOnInit(): void {
    this.getToday();
  }
  
  getWeek(){
    this.isLoading = true;
    this.week = this.todoService.getWeek(this.currentDate);
    this.isLoading = false;
  }
  
  getPrevious(){
    this.currentDate = this.todoService.getPrevious(this.currentDate);
    this.getWeek();
  }
  
  getToday(){
    this.currentDate = this.todoService.getToday();
    this.getWeek();
  }

  getNext(){
    this.currentDate = this.todoService.getNext(this.currentDate);
    this.getWeek();
  }
}
