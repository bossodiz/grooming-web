import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'breadcrumb',
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html',
  styles: ``,
})
export class BreadcrumbComponent {
  @Input() title: string = '';
  @Input() titleLink: string = '';
  @Input() subtitle: string = '';
}
