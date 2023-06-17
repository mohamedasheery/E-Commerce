import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderingService } from 'src/shared_modules/shared_services/ordering_services/ordering.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  errorMsg?: any;
  productsList?: any[];
  total: number = 0;
  counter?: number;
  ProductsIdsFromService?: any[] = [];
  orderedProducts?: any[] = [];
  constructor(private title: Title, private orders: OrderingService) {}

  ngOnInit(): void {
    this.title.setTitle('Cart');

    this.orders.getOrderedProducts().subscribe((data) => {
      this.productsList = data;
      this.productsList?.forEach((e: any) => {
        e.count = 1;
      });
      this.recalculatePrice();
    });
    this.getCartData();
  }
  increment(IdProduct: any) {
    this.productsList?.forEach((product) => {
      if (IdProduct == product.id) {
        product.count++;
        this.recalculatePrice();
      }
    });
  }

  desIncrement(IdProduct: any) {
    this.productsList?.forEach((product) => {
      if (IdProduct == product.id && product.count != 1) {
        product.count--;
        this.recalculatePrice();
      }
    });
  }

  recalculatePrice() {
    this.total = 0;
    this.productsList?.forEach((product) => {
      this.total += product.price * product.count;
    });
  }
  getCartData() {
    this.orders
      .getOrderCount()
      .subscribe((counter) => (this.counter = counter));
    this.orders
      .getProductsIDs()
      .subscribe((productsId) => (this.ProductsIdsFromService = productsId));
    this.orders
      .getOrderedProducts()
      .subscribe((orderedProducts) => (this.orderedProducts = orderedProducts));
    console.log(
      `${this.counter} ${this.ProductsIdsFromService} , ${this.orderedProducts}`
    );
  }

  deleteProductFromCart(product: any) {
    let isAddedBefore = this.ProductsIdsFromService?.includes(product.id);
    if (isAddedBefore) {
      this.counter! -= 1;
      this.orderedProducts = this.orderedProducts!.filter(
        (prod: any) => prod != product
      );
      this.ProductsIdsFromService = this.ProductsIdsFromService!.filter(
        (id: any) => id != product.id
      );

      this.orders.setOrderCount(this.counter);
      this.orders.setProductsIDs(this.ProductsIdsFromService);
      this.orders.setOrderedProducts(this.orderedProducts);

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
}
