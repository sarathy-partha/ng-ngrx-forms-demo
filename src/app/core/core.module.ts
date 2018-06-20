import { ToDoService } from '@app/todo/todo.service';
import { AppRoutingModule } from './../app-routing.module';
import { MaterialModule } from './../material.module';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeaderComponent } from '@app/core/header/header.component';
import { LeftNavComponent } from '@app/core/nav/left-nav/left-nav.component';

import { AuthModule } from '@app/core/auth/auth.module';
import { AuthService } from '@app/core/auth/auth.service';
@NgModule({
  declarations: [HeaderComponent, LeftNavComponent],
  imports: [
    CommonModule,
    AuthModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    HeaderComponent,
    LeftNavComponent
  ],
  providers: [AuthService, ToDoService]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
