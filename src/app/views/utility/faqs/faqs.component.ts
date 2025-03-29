import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { faqSection } from './data'
import feather from 'feather-icons'
import { NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'app-faqs',
    imports: [BreadcrumbComponent,NgbAccordionModule,NgbTooltipModule],
    templateUrl: './faqs.component.html',
    styles: ``
})
export class FaqsComponent {
  faqSection = faqSection
  ngAfterViewInit() {
    feather.replace()
  }
}
