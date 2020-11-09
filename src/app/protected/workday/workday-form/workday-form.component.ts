import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: [],
})
export class WorkdayFormComponent implements OnInit {
  workdayForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private workdaysService: WorkdaysService,
    private authService: AuthService) {}

  ngOnInit() {
    this.workdayForm = this.createWorkdayForm();
  }

  get dueDate() {
    return this.workdayForm.get('dueDate');
  }
  get notes() {
    return this.workdayForm.get('notes');
  }
  get tasks() {
    return this.workdayForm.get('tasks') as FormArray;
  }

  createWorkdayForm(): FormGroup {
    return this.fb.group({
      dueDate: ['', [Validators.required]],
      tasks: this.fb.array(
        [],
        [Validators.required, Validators.maxLength(6)]
      ),
      notes: ['', [
        Validators.maxLength(1000)
       ]]
    });
  }

  submit(): void {
    const userId: string = this.authService.currentUser.id;
    const workday: Workday = new Workday({...{ userId: userId }, ...this.workdayForm.value});
   
    this.workdaysService.save(workday).subscribe(
     _ => this.router.navigate(['/app/planning']),
     _ => this.workdayForm.reset()
    );
  }

  resetWorkdayForm() {
    while(this.tasks.length !== 0) {
     this.tasks.removeAt(0);
    }
    this.notes.reset();
   }

   onDateSelected(displayDate: string) {
    const userId: string = this.authService.currentUser.id; // On va récupérer la journée de travail par date pour l'utilisateur courant seulement.
    this.workdaysService.getWorkdayByDate(displayDate, userId).subscribe(workday => {
     this.resetWorkdayForm(); // On réinitialise le formulaire d'une journée de travail.   
     if(!workday) return; // Si cette journée de travail n'existe pas sur le Firestore, alors on s'arrête là.
    
     this.notes.setValue(workday.notes);
     workday.tasks.forEach(task => {
      const taskField: FormGroup = this.fb.group({
       title: task.title,
       todo: task.todo,
       done: task.done
      });
     this.tasks.push(taskField);
    
    });
  });

}


}
