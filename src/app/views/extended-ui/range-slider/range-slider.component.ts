import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { NouisliderModule } from 'ng2-nouislider'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-range-slider',
    imports: [BreadcrumbComponent, NouisliderModule, FormsModule],
    templateUrl: './range-slider.component.html',
    styles: ``
})
export class RangeSliderComponent {}
