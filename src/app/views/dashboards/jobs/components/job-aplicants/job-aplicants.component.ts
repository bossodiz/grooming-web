import { Component } from '@angular/core';
import { employees } from '../../data';

@Component({
  selector: 'app-job-aplicants',
  imports: [],
  templateUrl: './job-aplicants.component.html',
  styles: ``
})
export class JobAplicantsComponent {
  employees = employees
}
