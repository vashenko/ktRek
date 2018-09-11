import { DataSource } from '@angular/cdk/typings/collections';
import {MatPaginator, MatSort} from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge} from 'rxjs';



export interface DataTableItem {
  name: string;
  id: number;
  amount: number;
}

const EXAMPLE_DATA: DataTableItem[] = [
  {id: 1, name: 'Vlad', amount: 10},
  {id: 2, name: 'Vla', amount: 10},
  {id: 3, name: 'Vl', amount: 10},
  {id: 4, name: 'V', amount: 10}
];

export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  connect(): Observable<DataTableItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data
    }
    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'amount': return compare(a.amount, b.amount, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc? 1 : -1);
}

