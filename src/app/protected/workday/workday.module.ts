import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { WorkdayRoutingModule } from './workday-routing.module';
import { WorkdayComponent } from './workday/workday.component';

@NgModule({
  declarations: [WorkdayComponent],
  imports: [SharedModule, WorkdayRoutingModule],
})
export class WorkdayModule {}
