import {Component, OnInit} from '@angular/core';
import {Tables} from "../table.interface";
import {HttpClient} from "@angular/common/http";
import {Table} from "primeng/table";
import {ThemeService} from "../service/theme.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  table: Tables[];
  dateSelected: any;
  formatDate: string;

  constructor(private http: HttpClient, private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.getTable();
  }

  getDateString (){
    const format = (date) => date < 10 ? `0${date}` : date.toString();
    const date = new Date(this.dateSelected);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return this.formatDate = `${year}-${format(month)}-${format(day)}`;
  };

  getDate() {
    this.getDateString();
    if (this.formatDate !== "NaN-NaN-NaN") {
      this.http.get<any>(`https://api.nbp.pl/api/exchangerates/tables/A/${this.formatDate}/?format=json`).subscribe(
        response => {
          this.table = response[0].rates;
        }, error => {
          console.log(error)
        }
      )
    }
    return;
  }

  getTable() {
    this.http.get<any>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json').subscribe(
      response => {
        this.table = response[0].rates;
      }, error => {
        console.log(error)
      }
    )
  }

  clear(table: Table) {
    table.clear();
    this.dateSelected = Date.now();
    this.getDate();
  }

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme)
  }
}
