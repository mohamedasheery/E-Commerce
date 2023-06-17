import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OrderingService } from 'src/shared_modules/shared_services/ordering_services/ordering.service';
import { ProductsService } from 'src/shared_modules/shared_services/products_service/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private activeRouter: ActivatedRoute,
    private productService: ProductsService,
    private ordering: OrderingService,
    private pageTitle: Title
  ) {}
  productId?: any;
  product?: any;
  errorMsg?: any;
  ProductsIdsFromUser: any = [];
  counter: number = 0;
  img?: any;
  ProductsIdsFromService: any = [];
  orderedProducts: any = [];
  //||////||////||////||////||////||////||////||//
  //||////||////||////||////||////||////||////||//
  ngOnInit(): void {
    this.pageTitle.setTitle('Details');
    this.getProductWithIdFromParamMap();
    this.getCartData();
    this.img=this.productId;
  }
  ngOnDestroy(): void {
    //unimplemented unsubscribe subjects
  }
  //||////||////||////||////||////||////||////||//
  //||////||////||////||////||////||////||////||//
  getProductWithIdFromParamMap() {
    this.activeRouter.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      this.productService.GetProductById(this.productId).subscribe(
        (data) => (this.product = data),
        (err) => (this.errorMsg = err)
      );
    });
  }

  ////////////////////////////////////////////////////
  ///////////////////////////////////////////////////
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

  setCartData(item: any) {
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
  addToCart(item: any) {
    this.setCartData(item);
  }
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  changeImg(number: any) {
    this.img = number;
  }
}
