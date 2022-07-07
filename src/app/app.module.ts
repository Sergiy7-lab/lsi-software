import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }   from './app.component';

import {TableModule} from 'primeng/table';
import { TableComponent } from './table/table.component';
import {CalendarModule} from "primeng/calendar";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    CalendarModule
  ],
  declarations: [ AppComponent, TableComponent ],
  bootstrap:    [ AppComponent ],
  providers: []
})

export class AppModule { }
