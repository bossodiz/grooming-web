import { Component } from '@angular/core'
import { transaction } from '../data'

@Component({
    selector: 'app-widget-earning',
    imports: [],
    templateUrl: './widget-earning.component.html',
    styles: ``
})
export class WidgetEarningComponent {
  transaction = transaction
}
