import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../core/services/layout.service';

@Component({
  selector: 'al-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit, OnDestroy {
  public isSidenavCollapsed: boolean;
  private subscription: Subscription;
  
  constructor(private layoutService: LayoutService) { }
  
  ngOnInit() {
   this.subscription = 
    this.layoutService.isSidenavCollapsed$.subscribe(
     isSidenavCollapsed => this.isSidenavCollapsed = isSidenavCollapsed
    );
  }
  
  ngOnDestroy() {
   this.subscription.unsubscribe();
  }
 }
