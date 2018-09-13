import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {DataTableDataSource} from './data-table-data-source';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css'],
})
export class ManagersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource | null;

  showSpinner = true;

  displayedColumns: string[] = ['Name', 'Recommended Orders'];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.httpService);
  }

}
