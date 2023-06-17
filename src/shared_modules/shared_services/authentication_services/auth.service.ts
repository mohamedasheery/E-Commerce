import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { userInfo } from 'src/shared_modules/shared/classes/user-info';
import { userLogin } from 'src/shared_modules/shared/classes/user-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  urlPost: string = 'https://route-movies-api.vercel.app/signup';
  urlLogin: string = 'https://route-movies-api.vercel.app/signin';
  urlSinglUser:string = "https://jsonplaceholder.typicode.com/users/1";

  getSinglUser(id:string) {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error.message || 'some error from server ');
      })
    );
  }
  addUser(user: userInfo) {
    return this.http.post(this.urlPost, user).pipe(
      catchError((error) => {
        return throwError(() => error.message || 'some error from server ');
      })
    );
  }

  login(userLogin: userLogin) {
    return this.http.post(this.urlLogin, userLogin).pipe(
      catchError((error) => {
        return throwError(() => error.message || 'some error from server ');
      })
    );
  }


}
