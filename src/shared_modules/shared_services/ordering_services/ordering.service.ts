import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderingService {
  //OrderingService Act like Internal Server To Keep Our App Updated With Data
  // IT KEEPS TRACK OF PRODUCTS IN CART. COUNTER . IDS >>
  // >>PASSING AND RETRIEVING FROM LOCAL STORAGE AS MIDDLE SERVER BY USER ID
  constructor() {}
  addedProductsID = new BehaviorSubject([]);
  ordersCounter = new BehaviorSubject(0);
  orderedProducts = new BehaviorSubject([]);
  ////////////////////////////
  ordersWishListCounter = new BehaviorSubject(0);
  addedProductsIDToWishList = new BehaviorSubject([]);
  addedProductsToWishList = new BehaviorSubject([]);
  /////////////////////////////
  getOrderCount(): Observable<any> {
    return this.ordersCounter;
  }

  setOrderCount(latestValue: any) {
    return this.ordersCounter.next(latestValue);
  }
  ////////////////////////
  getProductsIDs(): Observable<any> {
    return this.addedProductsID;
  }
  setProductsIDs(latestValue: any) {
    return this.addedProductsID.next(latestValue);
  }
  ////////////////////////////
  getOrderedProducts(): Observable<any> {
    return this.orderedProducts;
  }

  setOrderedProducts(orders: any) {
    return this.orderedProducts.next(orders);
  }
  //////////////////////////////////////////
  setOrdersWishListCounter(latestValue: any) {
    return this.ordersWishListCounter.next(latestValue);
  }
  getOrdersWishListCounter() {
    return this.ordersWishListCounter;
  }
  /////////////////////WishList id//////
  setAddedProductsIDToWishList(latestValue: any) {
    return this.addedProductsIDToWishList.next(latestValue);
  }
  getAddedProductsIDToWishList() {
    return this.addedProductsIDToWishList;
  }
  /////////////////////WishList order//////
  setAddedProductsToWishList(latestValue: any) {
    return this.addedProductsToWishList.next(latestValue);
  }
  getAddedProductsToWishList() {
    return this.addedProductsToWishList;
  }
}
