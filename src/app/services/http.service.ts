import { Injectable } from '@angular/core';
import { Manager} from '../domains/manager.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ConvertService} from './convert.service';
import {ScheduleItem} from '../domains/ScheduleItem';
import {ScheduleService} from './schedule-service.service';



@Injectable()
export class HttpService {
  private managers_url = 'http://srv-dev-01.kt.local/Hryshenchuk/hs/ut/managers/';

  data: ScheduleItem[] = [];
  constructor(private http: HttpClient, private convert: ConvertService, private scheduleService: ScheduleService) {
  }


  getManagers(): Observable<Manager[]> {
    let managers: Manager[] = [];
    return this.http.get(this.managers_url).pipe(map(res => {
      return managers = this.convert.intoManagers(res, managers);
    }));
  }

}
