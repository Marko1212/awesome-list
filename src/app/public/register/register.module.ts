import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [SharedModule],
})
export class RegisterModule {}
