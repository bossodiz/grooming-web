import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { FlatpickrDirective } from '@common/flatpickr.directive'

@Component({
    selector: 'app-pickr',
    imports: [BreadcrumbComponent, FlatpickrDirective],
    templateUrl: './pickr.component.html',
    styles: ``
})
export class PickrComponent {}
