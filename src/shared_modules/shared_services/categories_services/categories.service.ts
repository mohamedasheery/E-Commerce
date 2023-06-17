import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  urlAllCategories: string = `https://fakestoreapi.com/products/categories`;
  urlSingleCategory: string = 'https://fakestoreapi.com/products/categories/'; // based of categoryname
  urlProductsByCategory: string = 'https://fakestoreapi.com/products/category/';

  constructor(private http: HttpClient) {}

  GetAllCategoriesName(): Observable<any[]> {
    return this.http.get<any[]>(this.urlAllCategories).pipe(
      catchError((error) => {
        return throwError(() => error.message || 'some error from server ');
      })
    );
  }
  GetSingleCategory(categoryName: any): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlSingleCategory}${categoryName}`)
      .pipe(
        catchError((error) => {
          return throwError(() => error.message || 'some error from server ');
        })
      );
  }

  GetProductsByCategory(categoryName: any): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlProductsByCategory}${categoryName}`)
      .pipe(
        catchError((error) => {
          return throwError(() => error.message || 'some error from server ');
        })
      );
  }
}
