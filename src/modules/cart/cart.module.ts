import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { SharedModuleModule } from 'src/shared_modules/sh_modules/shared-module/shared-module.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrdersListComponent, CheckoutComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CartModule {}
