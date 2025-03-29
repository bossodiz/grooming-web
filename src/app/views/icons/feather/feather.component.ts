import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import feather from 'feather-icons'

@Component({
    selector: 'app-feather',
    imports: [BreadcrumbComponent],
    templateUrl: './feather.component.html',
    styles: ``
})
export class FeatherComponent {
  ngAfterViewInit() {
    feather.replace()
  }
}
