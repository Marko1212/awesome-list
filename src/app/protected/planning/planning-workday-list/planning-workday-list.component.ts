import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [],
})
export class PlanningWorkdayListComponent implements OnInit {
 
  workdays: Workday[];
 
 constructor(
  private authService: AuthService,
  private workdayService: WorkdaysService) { }
 
 ngOnInit() {
  const id: string = this.authService.currentUser.id;
  this.workdayService.getWorkdayByUser(id).subscribe(workdays => this.workdays = workdays);
 }

 onWorkdayRemoved(workday: Workday) {
  this.workdayService.remove(workday)
   .subscribe(_ => this.workdays = this.workdays.filter(el => el.id !== workday.id))
 }



}
