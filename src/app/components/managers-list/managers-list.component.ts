import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService} from '../../services/firebase.service';
import { Manager } from '../../domains/manager.model';
import { MatPaginator, MatSort} from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css']
})
export class ManagersListComponent implements OnInit {
  managers: Manager[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    // this.managers = this.firebaseService.getManagers();
  }

}
