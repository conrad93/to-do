import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToDo } from 'src/app/models/to-do.model';
import { Week } from 'src/app/models/week.model';
import { ToDoService } from 'src/app/services/to-do.service';
import { ToDoFormComponent } from '../to-do-form/to-do-form.component';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit, OnDestroy {
  
  isLoading = true;
  week: Week[] = [];
  currentDate: string = '';
  weeklyItems: ToDo[] = [];
  
  constructor(private todoService: ToDoService, private modalService: NgbModal){}

  ngOnInit(): void {
    this.getToday();
  }
  
  getWeek(){
    this.todoService.updateData(this.weeklyItems);
    this.isLoading = true;
    this.week = this.todoService.getWeek(this.currentDate);
    this.weeklyItems = this.todoService.getWeeklyItems(this.currentDate);
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

  addItem(day: Week){
    const modalRef = this.modalService.open(ToDoFormComponent, {backdrop: "static", size: "md"});
    modalRef.componentInstance.weekDay = day;
    modalRef.result.then(item => {
      if(item){
        let index = this.weeklyItems.findIndex(mainItem => +mainItem.id === +item.id);
        if(index !== -1){
          this.weeklyItems[index] = item;
        } else {
          this.weeklyItems.push(item);
        }
        this.handleSave();
      }
    });
  }

  editItem(day: Week, todoItem: ToDo){
    const modalRef = this.modalService.open(ToDoFormComponent, {backdrop: "static", size: "md"});
    modalRef.componentInstance.weekDay = day;
    modalRef.componentInstance.todoItem = todoItem;
    modalRef.result.then(item => {
      if(item){
        let index = this.weeklyItems.findIndex(mainItem => +mainItem.id === +item.id);
        if(index !== -1){
          this.weeklyItems[index] = item;
        } else {
          this.weeklyItems.push(item);
        }
        this.handleSave();
      }
    });
  }

  deleteItem(i: number){
    this.weeklyItems.splice(i, 1);
    this.handleSave();
  }

  changeStatus(i: number){
    this.weeklyItems[i].status = !this.weeklyItems[i].status;
    this.handleSave();
  }

  handleSave(){
    this.todoService.updateData(this.weeklyItems);
    this.todoService.saveData();
  }

  ngOnDestroy(): void {
    this.handleSave();
  }

}
