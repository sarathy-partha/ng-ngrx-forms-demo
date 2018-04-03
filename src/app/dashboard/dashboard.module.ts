import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { ProgressContentComponent } from './progress-content/progress-content.component';
import { SharedModule } from '../common/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent, ProgressContentComponent],
  imports: [SharedModule, DashboardRoutingModule],
  exports: []
})
export class DashboardModule {}
