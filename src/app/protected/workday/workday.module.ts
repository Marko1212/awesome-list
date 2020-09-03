import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { WorkdayComponent } from './workday/workday.component';

@NgModule({
  declarations: [WorkdayComponent],
  imports: [SharedModule],
})
export class WorkdayModule {}
