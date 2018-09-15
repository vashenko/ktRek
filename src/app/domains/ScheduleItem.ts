import {ManagerClient} from './client.modetl';

export class ScheduleItem {
  constructor(public managerId: string,
              public Monday: ManagerClient[],
              public Tuesday: ManagerClient[],
              public Wednesday: ManagerClient[],
              public Thursday: ManagerClient[],
              public Friday: ManagerClient[],
              public AnyDay: ManagerClient[]) {
  }
}

