import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { ParametersRoutingModule } from './parameters-routing.module';
import { ParametersComponent } from './parameters/parameters.component';

@NgModule({
  declarations: [ParametersComponent],
  imports: [SharedModule, ParametersRoutingModule],
})
export class ParametersModule {}
