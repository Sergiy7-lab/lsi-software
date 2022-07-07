export interface TableCurrency {
  currency: string;
  code: string;
  mid: number;
}

export interface Tables {
  effectiveDate: number;
  no: any;
  rates: TableCurrency[];
  table: string;
}
