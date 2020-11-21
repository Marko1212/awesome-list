import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable, of, Subject } from 'rxjs';
import { delay, map, takeUntil, takeWhile } from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task';
import { Workday } from 'src/app/shared/models/workday';
import { WorkdaysService } from './../../../core/services/workdays.service';

// Les autres importations
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'al-dashboard-workday',
  templateUrl: './dashboard-workday.component.html',
  styleUrls: ['./dashboard-workday.component.scss'],
})
export class DashboardWorkdayComponent implements OnInit {
  @Input() workday: Workday;
  isWorkdayComplete: boolean;
  isPomodoroActive: boolean;

  startPomodoro$: Subject<string>;
  cancelPomodoro$: Subject<string>;
  completePomodoro$: Subject<string>;
  currentProgress: number;
  maxProgress: number;
  pomodoro$: Observable<number>;

  constructor(private workdaysService: WorkdaysService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isWorkdayComplete = (this.task === undefined);
    this.isPomodoroActive = false;
    this.startPomodoro$ = new Subject();
    this.cancelPomodoro$ = new Subject();
    this.completePomodoro$ = new Subject();
    this.currentProgress = 0;
    this.maxProgress = this.authService.currentUser.pomodoroDuration;
    this.pomodoro$ = interval(1000).pipe(
      takeUntil(this.cancelPomodoro$),
      takeUntil(this.completePomodoro$),
      takeWhile((progress) => progress <= this.maxProgress),
      map((x) => x + 1)
    );
  }

  startPomodoro() {
    this.isPomodoroActive = true;
    this.startPomodoro$.next('start');
    this.pomodoro$.subscribe({
      next: (progress) => {
        this.currentProgress = progress;
        if (progress === this.maxProgress) {
          of(0)
            .pipe(delay(500))
            .subscribe((_) => this.completePomodoro());
        }
      },
    });
  }

  cancelPomodoro() {
    this.cancelPomodoro$.next('cancel');
    this.isPomodoroActive = false;
  }

  completePomodoro() {
    this.completePomodoro$.next('complete');
    this.isPomodoroActive = false;

    // <img draggable="false" role="img" class="emoji" alt="👉" src="https://s.w.org/images/core/emoji/13.0.0/svg/1f449.svg"> Étape n°2 : Incrémenter la tâche courante.
    this.task.done++;

    this.workdaysService.update(this.workday).subscribe();

    this.isWorkdayComplete = (this.task === undefined);

   
  }

  get task(): Task | undefined {
    return this.workday.tasks.find((task:Task) => task.todo > task.done);
  }
}
