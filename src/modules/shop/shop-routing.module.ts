import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopListComponent } from './shop-list/shop-list.component';

const routes: Routes = [
  {
    path: 'shop-list',
    component: ShopListComponent,
  },
  { path: 'shop-list/details/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
