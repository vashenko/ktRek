import {DataSource } from '@angular/cdk/table';
import {MatPaginator, MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {Manager} from '../../domains/manager.model';
import {HttpService} from '../../services/http.service';

export class DataTableDataSource extends DataSource<Manager> {
  data: Manager[];
  constructor(private paginator: MatPaginator, private sort: MatSort, private httpService: HttpService) {
    super();
    this.httpService.getManagers().subscribe(res => {
      this.data = res;
    });
  }

  connect(): Observable<Manager[]> {
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

  getPagedData(data: Manager[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Manager[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Name': return compare(a.Name, b.Name, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1);
}
