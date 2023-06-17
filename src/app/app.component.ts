import { Component } from '@angular/core';
import { OrderingService } from 'src/shared_modules/shared_services/ordering_services/ordering.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Ecommerce-iti';
  constructor(private ordering: OrderingService) {}
  ngOnInit(): void {
    this.GetUserCartDataFromLocal();
    this.GetUserWishlistDataFromLocal();
  }

  GetUserCartDataFromLocal() {
    if (sessionStorage.getItem('TokenUser') != null) {
      let userId = localStorage.getItem('userId')!;
      let userData = JSON.parse(localStorage.getItem(userId)!);
      if (userData[0] != null && userData[1] != null && userData[2] != null) {
        this.ordering.setOrderCount(userData[0]);
        this.ordering.setOrderedProducts(userData[2]);
        this.ordering.setProductsIDs(userData[1]);
      }
    }
  }
  GetUserWishlistDataFromLocal() {
    if (
      sessionStorage.getItem('TokenUser') != null &&
      sessionStorage.getItem('TokenUser') != undefined
    ) {
      let userIdWishlist = localStorage.getItem('userIdWishlist')!;

      if (localStorage.getItem(userIdWishlist) == null || undefined) {
        this.ordering.setOrdersWishListCounter(0);
        this.ordering.setAddedProductsToWishList([]);
        this.ordering.setAddedProductsIDToWishList([]);
        localStorage.setItem(userIdWishlist, JSON.stringify([0, [], [], 3]));
      } else {
        for (let index = 0; index < Object.keys(localStorage).length; index++) {
          if (userIdWishlist == Object.keys(localStorage)[index]) {
            let userDataWishlist = JSON.parse(
              localStorage.getItem(userIdWishlist)!
            );
            console.log('data is found');

            this.ordering.setOrdersWishListCounter(userDataWishlist[0]);
            this.ordering.setAddedProductsToWishList(userDataWishlist[2]);
            this.ordering.setAddedProductsIDToWishList(userDataWishlist[1]);
          } else {
            console.log('not found data ');
          }
        }
      }
    }
  }
}
