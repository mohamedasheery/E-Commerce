import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { ItemsComponent } from './items/items.component';
import { SharedModuleModule } from 'src/shared_modules/sh_modules/shared-module/shared-module.module';

@NgModule({
  declarations: [ItemsComponent],
  imports: [CommonModule, WishlistRoutingModule, SharedModuleModule],
})
export class WishlistModule {}
