import {Component, OnInit, ViewChild} from '@angular/core';;
import {MatPaginator, MatSort} from '@angular/material';
import {HttpService} from '../../services/http.service';
import {DataTableDataSource} from './data-table-data-source';
import {Manager} from '../../domains/manager.model';
import {Subject} from 'rxjs';
import {ConvertService} from '../../services/convert.service';
import {ScheduleService} from '../../services/schedule-service.service';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css'],
})
export class ManagersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource | null;

  displayedColumns: string[] = ['Name', 'Recommended Orders'];

  constructor(private httpService: HttpService, private convert: ConvertService, private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.httpService);
  }
}


