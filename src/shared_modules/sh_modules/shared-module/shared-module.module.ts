import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleRoutingModule } from './shared-module-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    RedirectComponent,
  ],
  imports: [CommonModule, SharedModuleRoutingModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    RedirectComponent,
  ],
})
export class SharedModuleModule {}
