import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScheduleItem} from '../domains/ScheduleItem';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ManagerClient} from '../domains/client.modetl';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService{
  private schedule_url = 'http://srv-dev-01.kt.local/Hryshenchuk/hs/ut/baseSchedulers/';

  constructor(private http: HttpClient) { }

  getSchedule(): Observable<ScheduleItem[]> {
    let result: ScheduleItem[] = [];
    return this.http.get(this.schedule_url).pipe(map(res => {
      return result = this.convertInotScheduleItems(res, result);
    }));
  }

  convertInotScheduleItems(res, result): ScheduleItem[] {
    res.forEach(item => result.push(
      new ScheduleItem(
        item['managerId'], this.getClientsByDay(item['Monday']),
        this.getClientsByDay(item['Tuesday']), this.getClientsByDay(item['Wednesday']),
        this.getClientsByDay(item['Thursday']), this.getClientsByDay(item['Friday']), this.getClientsByDay(item['AnyDay']))));
    return result;
  }

  getClientsByDay(ClientsArray: {}): ManagerClient[] {
    const clients: ManagerClient[] = [];
    for (const v in ClientsArray) {
      clients.push(new ManagerClient(ClientsArray[v].clientName, ClientsArray[v].clientId));
    }
    return clients;
  }
}
