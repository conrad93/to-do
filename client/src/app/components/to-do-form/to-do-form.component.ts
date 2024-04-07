import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToDo } from 'src/app/models/to-do.model';
import { Week } from 'src/app/models/week.model';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss']
})
export class ToDoFormComponent implements OnInit, OnDestroy {
  @Input() weekDay: Week | undefined;
  @Input() todoItem: ToDo | undefined;
  toDoForm: FormGroup;

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal){
    this.toDoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [false]
    });
  }

  ngOnInit(): void {
    this.toDoForm.patchValue({
      title: this.todoItem?.title ? this.todoItem.title : '',
      description: this.todoItem?.description ? this.todoItem.description : '',
      status: this.todoItem?.status ? this.todoItem.status : false
    });
  }

  onSubmit(){
    this.activeModal.close({
      title: this.toDoForm.get("title")?.value,
      description: this.toDoForm.get("description")?.value,
      id: this.todoItem?.id ? this.todoItem.id : Date.now(),
      status: this.toDoForm.get("status")?.value,
      date: this.todoItem?.date ? this.todoItem.date : this.weekDay?.fullDate
    });
  }

  close(){
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.toDoForm.reset();
  }

}
