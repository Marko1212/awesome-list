import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// Ajouter les importations suivantes :
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'al-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  public prefix = 'app';
  public dashboardPath = `${this.prefix}/dashboard`;
  public planningPath = `${this.prefix}/planning`;
  public workdayPath = `${this.prefix}/workday`;
  public profilPath = `${this.prefix}/profil`;
  public parametersPath = `${this.prefix}/parameters`;

  public subscription: Subscription;
  public user: User;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }
  public isActive(page: string): boolean {
    return this.router.isActive(page, true);
  }
}
