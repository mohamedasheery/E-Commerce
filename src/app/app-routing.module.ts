import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/modules/authentication/login/login.component';
import { AuthGuardGuard } from 'src/shared_modules/shared_services/authentication_services/auth-guard.guard';
import { PageNotFoundComponent } from 'src/shared_modules/sh_modules/shared-module/page-not-found/page-not-found.component';
import { RedirectComponent } from 'src/shared_modules/sh_modules/shared-module/redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('../modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('../modules/shop/shop.module').then((m) => m.ShopModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('../modules/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../modules/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('../modules/wishlist/wishlist.module').then(
        (m) => m.WishlistModule
      ),
  },
  {
    path: 'redirect',
    component: RedirectComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
