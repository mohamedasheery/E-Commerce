import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { OrderingService } from 'src/shared_modules/shared_services/ordering_services/ordering.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cartCount?: number;
  wishlistCount?: number;
  token: boolean = false;
  userName: string = '';
  decodedToken: any;
  constructor(private orders: OrderingService) {}

  ngOnInit(): void {
    this.getOrdersCounter();
    this.getWishListCounter();
    this.getToken();
    this.decodedToken = this.getDecodedAccessToken(
      sessionStorage.getItem('TokenUser')
    );
    this.userName = this.decodedToken.first_name;
  }

  getOrdersCounter() {
    this.orders
      .getOrderCount()
      .subscribe((counter) => (this.cartCount = counter));
  }
  getWishListCounter() {
    this.orders
      .getOrdersWishListCounter()
      .subscribe((counter) => (this.wishlistCount = counter));
  }

  getToken() {
    if (sessionStorage.getItem('TokenUser')) {
      this.token = true;
    }
  }
  getDecodedAccessToken(token: any): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
  logOut() {
    sessionStorage.removeItem('TokenUser');
    this.token = false;
  }
}
