import {RecommendedOrders} from './recomendedOrder.model';
import {Optional} from '@angular/core';

export class Manager {
  constructor(public managerName: string,
              public user1cId: string,
              @Optional() public recommendedOrders: RecommendedOrders[]) {
  }
}
