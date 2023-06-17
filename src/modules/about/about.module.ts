import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { SharedModuleModule } from 'src/shared_modules/sh_modules/shared-module/shared-module.module';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [CommonModule, AboutRoutingModule, SharedModuleModule],
})
export class AboutModule {}
