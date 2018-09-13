import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Manager} from '../domains/manager.model';
import { RecommendedOrders } from '../domains/recomendedOrder.model';
import { OrderedProducts } from '../domains/OrderedProducts.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  recommendedOrders: RecommendedOrders[] = [];

  constructor(private firebase: AngularFireDatabase) {}

  getRecommendedOrdersByUser1cId(user1cId: string): number {
    const result = this.getRecommendedOrders().filter(recOrd => {
      return recOrd.user1cId === user1cId;
    });
    return result.length;
  }

  getRecommendedOrders(): RecommendedOrders[] {
    this.firebase.list('/partnerPointRecommendedOrders')
      .valueChanges()
      .subscribe(res => {
        this.recommendedOrders.length = 0;
        res.forEach(item => {
          this.recommendedOrders.push(
            new RecommendedOrders(item['creationDate'], this.getOrderedProducts(item['orderProducts']), item['user1cId'], item['status']));
        });
      });
    return this.recommendedOrders;
  }

  getOrderedProducts(Products: {}): OrderedProducts[] {
    const orderedProducts: OrderedProducts[] = [];
    for(let val in Products) {
      orderedProducts.push(new OrderedProducts(Products[val].count, Products[val].price, Products[val].summarycode));
    }
    return orderedProducts;
  }
}
