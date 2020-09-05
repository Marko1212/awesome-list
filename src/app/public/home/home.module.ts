import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { HomeFeatureCardComponent } from './home-feature-card/home-feature-card.component';
//import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent,
    HomeFeaturesComponent,
    HomeFeatureCardComponent,
  ],
  imports: [SharedModule],
})
export class HomeModule {}
