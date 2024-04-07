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
  weekData: any = {};
  total = 0;
  
  constructor(private todoService: ToDoService, private modalService: NgbModal){}

  ngOnInit(): void {
    this.getToday();
  }

  processItems(){
    this.total = 0;
    this.weekData = {};
    this.week.forEach(e => {
      this.weekData[e.fullDate] = {
        count: 0,
        day: e.day,
        items: []
      };
    });
    this.weeklyItems.forEach(e => {
      if(this.weekData[e.date]){
        this.weekData[e.date]["count"] += 1;
        this.weekData[e.date]["items"].push(e);
      }
    });

    for(let data in this.weekData){
      this.weekData[data]["items"].push({addItem: true});
      this.weekData[data]["count"] += 1;
      this.total = Math.max(this.total, this.weekData[data]["count"]);
    }
  }

  getCounterArray(){
    return new Array(this.total);
  }
  
  getWeek(){
    this.todoService.updateData(this.weeklyItems);
    this.isLoading = true;
    this.week = this.todoService.getWeek(this.currentDate);
    this.weeklyItems = this.todoService.getWeeklyItems(this.currentDate);
    this.processItems();
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
        this.processItems();
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
        this.processItems();
      }
    });
  }

  deleteItem(id: any){
    let index = this.weeklyItems.findIndex(mainItem => +mainItem.id === +id);
    this.weeklyItems.splice(index, 1);
    this.handleSave();
    this.processItems();
  }

  changeStatus(id: any){
    let index = this.weeklyItems.findIndex(mainItem => +mainItem.id === +id);
    this.weeklyItems[index].status = !this.weeklyItems[index].status;
    this.handleSave();
    this.processItems();
  }

  handleSave(){
    this.todoService.updateData(this.weeklyItems);
    this.todoService.saveData();
  }

  ngOnDestroy(): void {
    this.handleSave();
  }

}
