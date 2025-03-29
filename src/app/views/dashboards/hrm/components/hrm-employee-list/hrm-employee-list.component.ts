import { Component } from '@angular/core';
import { hrmEmployee } from '../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hrm-employee-list',
  imports: [CommonModule],
  templateUrl: './hrm-employee-list.component.html',
  styles: ``
})
export class HrmEmployeeListComponent {
  hrmEmployee = hrmEmployee
}
