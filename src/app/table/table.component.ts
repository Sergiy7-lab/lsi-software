import {Component, Inject, OnInit} from '@angular/core';
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
    return `${year}-${format(month)}-${format(day)}`;
  };

  getDate() {
    const formatDate = this.getDateString();
    console.log(formatDate)
    this.http.get<any>(`http://api.nbp.pl/api/exchangerates/tables/A/${formatDate}/?format=json`).subscribe(
      response => {
        this.table = response[0].rates;
        console.log(response[0].rates)
      }
    )
  }

  getTable() {
    this.http.get<any>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json').subscribe(
      response => {
        this.table = response[0].rates;
        console.log(response[0].rates)

      }
    )
  }

  clear(table: Table) {
    table.clear();
    this.dateSelected = Date.now();
    this.getDate();

  }


  changeTheme(theme: string) {
    console.log(theme)
    this.themeService.switchTheme(theme)
  }
}
