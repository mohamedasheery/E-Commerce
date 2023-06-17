import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared_modules/shared_services/authentication_services/auth.service';
import { OrderingService } from 'src/shared_modules/shared_services/ordering_services/ordering.service';
import jwtDecode from 'jwt-decode';
import { Title } from '@angular/platform-browser';
import { userLogin } from 'src/shared_modules/shared/classes/user-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private orderingData: OrderingService,
    private title: Title
  ) {}
  ////////////////////////////////////////////////////////
  loginForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9.%-]+@[A-Za-z0-9.%-]+\\.[a-z]{2,3}$'),
      ],
    ],

    password: ['', [Validators.required, Validators.pattern('^[a-z0-9]{6,}$')]],
  });
  get Email() {
    return this.loginForm.get('email');
  }
  get Password() {
    return this.loginForm.get('password');
  }
  // userLogin: any = {
  //   email: '',
  //   password: '',
  // };
  ///////////////////////////////////////////////////////
  ngOnInit(): void {
    this.title.setTitle('Login');
  }
  //////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  userToken: any = {};
  error: any = '';
  getDecodedAccessToken(token: any): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
  GetUserWishlistDataFromLocal() {
    if (
      sessionStorage.getItem('TokenUser') != null &&
      sessionStorage.getItem('TokenUser') != undefined
    ) {
      let userIdWishList = localStorage.getItem('userIdWishlist')!;

      if (localStorage.getItem(userIdWishList) == null || undefined) {
        this.orderingData.setOrdersWishListCounter(0);
        this.orderingData.setAddedProductsToWishList([]);
        this.orderingData.setAddedProductsIDToWishList([]);
        localStorage.setItem(userIdWishList, JSON.stringify([0, [], [], 3]));
      } else {
        for (let index = 0; index < Object.keys(localStorage).length; index++) {
          if (userIdWishList == Object.keys(localStorage)[index]) {
            let userDataWishList = JSON.parse(
              localStorage.getItem(userIdWishList)!
            );
            this.orderingData.setOrdersWishListCounter(userDataWishList[0]);
            this.orderingData.setAddedProductsToWishList(userDataWishList[2]);
            this.orderingData.setAddedProductsIDToWishList(userDataWishList[1]);
          } else {
            console.log('not found data ');
          }
        }
      }
    }
  }
  GetUserCartDataFromLocal(id: any) {
    if (localStorage.getItem(id) == null) {
      this.orderingData.setOrderCount(0);
      this.orderingData.setProductsIDs([]);
      this.orderingData.setOrderedProducts([]);
      localStorage.setItem(id, JSON.stringify([0, [], [], 3]));
      console.log('from el if el kbera');
    } else {
      console.log('from else el if elkbera');
      for (let index = 0; index < Object.keys(localStorage).length; index++) {
        if (id == Object.keys(localStorage)[index]) {
          let data = JSON.parse(localStorage.getItem(id)!);

          this.orderingData.setOrderCount(data[0]);
          this.orderingData.setProductsIDs(data[1]);
          this.orderingData.setOrderedProducts(data[2]);

          console.log('from if bta3t el for loop');
        } else {
          console.log('ليه بتبص علي حاجه غيرك ؟ هقول للبشمهندس ابانوب :)');
        }
      }
    }
  }

  //(will call get data and decoded token in save data function)
userData:any;
  fillForm(){
    this.authService.getSinglUser('2').subscribe((data)=>{
      console.log(data);
      this.userData =data;
      this.loginForm.patchValue({
        email:this.userData.email,
        password: this.userData.phone,
     })
    },(error)=>{console.log(error);
    })
   
  }
  seveData() {

    let userlog :userLogin = this.loginForm.value as userLogin;
    console.log(userlog);
    
    

    this.authService.login(userlog).subscribe(
      (data) => {
        this.userToken = data;

        if (this.userToken.token != null && this.userToken.token != undefined) {
          sessionStorage.setItem(
            'TokenUser',
            JSON.stringify(this.userToken.token)
          );

          let userData = this.getDecodedAccessToken(this.userToken.token);
          let userId = userData._id;
          localStorage.setItem('userId', userId); //id user for cart
          localStorage.setItem('userIdWishlist', userId + 'Wishlist'); //id user for wishlist

          this.GetUserWishlistDataFromLocal();
          this.GetUserCartDataFromLocal(userId);

          this.router.navigate(['/home/overview']);
        } else {
          this.error = this.userToken.message;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
