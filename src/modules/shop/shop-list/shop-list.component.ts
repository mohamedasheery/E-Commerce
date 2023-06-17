import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoriesService } from 'src/shared_modules/shared_services/categories_services/categories.service';
import { OrderingService } from 'src/shared_modules/shared_services/ordering_services/ordering.service';
import { ProductsService } from 'src/shared_modules/shared_services/products_service/products.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit, OnDestroy {
  constructor(
    private categories: CategoriesService,
    private products: ProductsService,
    private ordering: OrderingService,
    private pageTitle: Title
  ) {}
  categoriesName?: any[];
  productList?: any[];
  httpError?: any;
  counter: number = 0;
  ProductsIdsFromService: any = [];
  orderedProducts: any = [];
  orderedProductsWishList: any = [];
  ProductsIdToWishList: any = [];
  WishListCounter: number = 0;
  // || \\// || \\// || \\// || \\// || \\
  // || \\// || \\// || \\// || \\// || \\

  ngOnDestroy(): void {
    // unimplemented unsubscribe subjects
  }
  ngOnInit(): void {
    this.pageTitle.setTitle('Shop');
    this.getCategoriesName();
    this.getAllProducts();
    this.getCartData();
    this.getWishListData();
  }

  // || \\// || \\// || \\// || \\// || \\
  // || \\// || \\// || \\// || \\// || \\
  getCategoriesName() {
    this.categories
      .GetAllCategoriesName()
      .subscribe((data) => (this.categoriesName = data));
  }
  getAllProducts() {
    this.products.GetAllProducts().subscribe(
      (data) => (this.productList = data),
      (error) => (this.httpError = error)
    );
  }

  getProductsByCategory(categoryName: any) {
    this.categories.GetProductsByCategory(categoryName).subscribe(
      (data) => (this.productList = data),
      (error) => (this.httpError = error)
    );
  }

  //\\//\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\///\\\
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
  }
  //\\//\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\///\\\
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

  addProductToCart(item: any) {
    this.setCartData(item);
  }
  //\\//\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\///\\\
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
  addProductToWishList(item: any) {
    let isAddedBefore = this.ProductsIdToWishList.includes(item.id);
    if (!isAddedBefore) {
      this.WishListCounter += 1;
      this.orderedProductsWishList.push(item);
      this.ProductsIdToWishList.push(item.id);
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
