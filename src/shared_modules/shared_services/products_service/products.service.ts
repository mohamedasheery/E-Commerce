import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  allProductsUrl: string = 'https://fakestoreapi.com/products';
  productsPaginationUrl: string = 'https://fakestoreapi.com/products?limit=4';

  constructor(private http: HttpClient) {}

  GetAllProducts(): Observable<any> {
    return this.http.get<any>(this.allProductsUrl).pipe(
      catchError((error) => {
        return throwError(error.message || 'Server Error');
      })
    );
  }

  GetProductById(id: any): Observable<any> {
    return this.http.get<any>(`${this.allProductsUrl}/${id}`).pipe(
      catchError((error) => {
        return throwError(error.message || 'Server Error');
      })
    );
  }

  GetProductsPagination() {
    return this.http.get<any>(this.productsPaginationUrl).pipe(
      catchError((error) => {
        return throwError(error.message || 'Server Error');
      })
    );
  }
}
