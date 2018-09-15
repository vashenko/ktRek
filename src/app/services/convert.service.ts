import {Injectable} from '@angular/core';
import {Manager} from '../domains/manager.model';
import {FirebaseService} from './firebase.service';
import {ScheduleItem} from '../domains/ScheduleItem';
import {ManagerClient} from '../domains/client.modetl';
import {ScheduleService} from './schedule-service.service';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  data: ScheduleItem[] = [];
  constructor(private firebaseService: FirebaseService, private scheduleService: ScheduleService) {
  }
  intoManagers(res, managers): Manager[] {
    res.forEach(item => {
      managers.push(new Manager(item['active'], item['directionId'], item['directionName'], item['email'], item['headId'],
        item['headName'], item['managerId'], item['managerName'], item['salesManager'], item['unitId'],
        item['unitName'], item['user1cId'], item['user1cName'], this.firebaseService.getRecommendedOrdersByUser1cId(item['user1cId'])))
    });
    return managers.filter(manager => {
      return manager.active === true;
    });
  }

}
