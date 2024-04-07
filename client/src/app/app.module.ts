import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToDoComponent } from './components/to-do/to-do.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToDoService } from './services/to-do.service';
import { ToDoFormComponent } from './components/to-do-form/to-do-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    ToDoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (todoService: ToDoService) => {
        return (): Promise<any> => {
          return todoService.getData();
        }
      },
      deps: [ToDoService]
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ToDoFormComponent]
})
export class AppModule { }
