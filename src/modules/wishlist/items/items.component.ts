import { Component, OnInit } from '@angular/core';
import { OrderingService } from 'src/shared_modules/shared_services/ordering_services/ordering.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  constructor(private ordering: OrderingService) {}
  counter: number = 0;
  WishListCounter: number = 0;
  ProductsIdsFromService: any = [];
  orderedProducts: any = [];
  productList?: any[];
  orderedProductsWishList: any = [];
  ProductsIdToWishList: any = [];

  ngOnInit(): void {
    this.ordering
      .getAddedProductsToWishList()
      .subscribe((Products: any[] | undefined) => {
        this.productList = Products;
      });

    this.getWishListData();
    this.getCartData();
  }

  getCartData() {
    this.ordering
      .getOrderCount()
      .subscribe((counter) => (this.counter = counter));
    this.ordering
      .getProductsIDs()
      .subscribe((productsId) => (this.ProductsIdsFromService = productsId));
    this.ordering
      .getOrderedProducts()
      .subscribe((orderedProducts) => (this.orderedProducts = orderedProducts));
    console.log(
      `${this.counter} ${this.ProductsIdsFromService} , ${this.orderedProducts}`
    );
  }

  addToCart(item: any) {
    this.deleteFromWishList(item);
    let isAddedBefore = this.ProductsIdsFromService.includes(item.id);
    if (!isAddedBefore) {
      this.ProductsIdsFromService.push(item.id);
      this.orderedProducts.push(item);
      this.ordering.setProductsIDs(this.ProductsIdsFromService);
      this.ordering.setOrderedProducts(this.orderedProducts);
      this.counter += 1;
      this.ordering.setOrderCount(this.counter);

      let userId = localStorage.getItem('userId')!;
      localStorage.setItem(
        userId,
        JSON.stringify([
          this.counter,
          this.ProductsIdsFromService,
          this.orderedProducts,
        ])
      );
    }
  }

  getWishListData() {
    this.ordering
      .getOrdersWishListCounter()
      .subscribe((counter) => (this.WishListCounter = counter));
    this.ordering
      .getAddedProductsIDToWishList()
      .subscribe((productsId) => (this.ProductsIdToWishList = productsId));
    this.ordering
      .getAddedProductsToWishList()
      .subscribe(
        (orderedProducts) => (this.orderedProductsWishList = orderedProducts)
      );
  }
  deleteFromWishList(item: any) {
    let isAddedBefore = this.ProductsIdToWishList.includes(item.id);
    if (isAddedBefore) {
      this.WishListCounter -= 1;
      this.orderedProductsWishList = this.orderedProductsWishList.filter(
        (product: any) => product != item
      );
      this.ProductsIdToWishList = this.ProductsIdToWishList.filter(
        (id: any) => id != item.id
      );
      console.log(this.orderedProductsWishList);
      console.log(this.ProductsIdToWishList);
      console.log(this.WishListCounter);

      this.ordering.setOrdersWishListCounter(this.WishListCounter);
      this.ordering.setAddedProductsIDToWishList(this.ProductsIdToWishList);
      this.ordering.setAddedProductsToWishList(this.orderedProductsWishList);

      let userIdWishList = localStorage.getItem('userIdWishlist')!;
      localStorage.setItem(
        userIdWishList,
        JSON.stringify([
          this.WishListCounter,
          this.ProductsIdToWishList,
          this.orderedProductsWishList,
        ])
      );
    }
  }
}
