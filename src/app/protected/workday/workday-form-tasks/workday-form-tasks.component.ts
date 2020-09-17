import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'al-workday-form-tasks',
  templateUrl: './workday-form-tasks.component.html',
  styles: [
  ]
})
export class WorkdayFormTasksComponent implements OnInit {

  @Input() tasks: FormArray;
  @Input() workdayForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onAddedTask() {
    const taskGroup = this.fb.group({
     'title': ''
    });
    this.tasks.push(taskGroup);
   }

   onRemovedTask(index: number) {
    this.tasks.removeAt(index);
   }

}
