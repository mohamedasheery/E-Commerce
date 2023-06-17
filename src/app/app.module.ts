import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AboutModule } from 'src/modules/about/about.module';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { CartModule } from 'src/modules/cart/cart.module';
import { HomeModule } from 'src/modules/home/home.module';
import { ShopModule } from 'src/modules/shop/shop.module';
import { WishlistModule } from 'src/modules/wishlist/wishlist.module';
import { SharedModuleModule } from 'src/shared_modules/sh_modules/shared-module/shared-module.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RedirectComponent } from 'src/shared_modules/sh_modules/shared-module/redirect/redirect.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    HomeModule,
    ShopModule,
    WishlistModule,
    CartModule,
    AboutModule,
    SharedModuleModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
