import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastService } from './toast.service'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-notification',
    imports: [BreadcrumbComponent, NgbToastModule, FormsModule,CommonModule],
    templateUrl: './notification.component.html',
    styles: ``,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationComponent {
  toastService = inject(ToastService)
  liveToast = false
  show = true
  show1 = true
  show2 = true
  show3 = true
  placement = true
  translucent = false
  toastPlacement: string = ''

  close() {
    this.show = false
  }

  showStandard() {
    this.toastService.show({
      content: 'See Just like this',
      delay: 10000,
      classname: 'standard',
    })
  }

  showSuccess() {
    this.toastService.show({
      content: 'Heads up, toasts will stack automatically',
      delay: 10000,
      classname: 'standard',
    })
  }
}
