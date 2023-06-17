import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './home-view/home-view.component';
import { SharedModuleModule } from 'src/shared_modules/sh_modules/shared-module/shared-module.module';

@NgModule({
  declarations: [HomeViewComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModuleModule],
})
export class HomeModule {}
