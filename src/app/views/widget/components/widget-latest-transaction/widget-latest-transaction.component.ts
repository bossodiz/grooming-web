import { Component } from '@angular/core'
import { latestTransaction } from '../data'
import feather from 'feather-icons'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'app-widget-latest-transaction',
    imports: [NgbDropdownModule],
    templateUrl: './widget-latest-transaction.component.html',
    styles: ``
})
export class WidgetLatestTransactionComponent {
  latestTransaction = latestTransaction
  ngAfterViewInit() {
    feather.replace()
  }
}
