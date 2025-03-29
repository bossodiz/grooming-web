import { Component, inject, TemplateRef } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import {
  NgbDropdownModule,
  NgbOffcanvas,
  NgbOffcanvasModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'app-offcanvas',
    imports: [BreadcrumbComponent, NgbOffcanvasModule, NgbDropdownModule],
    templateUrl: './offcanvas.component.html',
    styles: ``
})
export class OffcanvasComponent {
  private offcanvasService = inject(NgbOffcanvas)

  openStart(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.dismiss()
    this.offcanvasService.open(content, {
      position: 'start',
    })
  }

  openEnd(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.open(content, { position: 'end' })
  }

  openTop(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.open(content, { position: 'top' })
  }

  openBottom(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.open(content, { position: 'bottom' })
  }

  openNoBackdrop(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.open(content, { backdrop: false, scroll: true })
  }

  openDark(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.open(content, {
      position: 'start',
      panelClass: 'text-bg-dark',
    })
  }

  openScroll(scroll: TemplateRef<any>) {
    this.offcanvasService.open(scroll, { scroll: true })
  }
}
