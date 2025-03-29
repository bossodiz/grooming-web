import { Component } from '@angular/core'
import { topPerform } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-top-perform',
    imports: [CommonModule],
    templateUrl: './top-perform.component.html',
    styles: ``
})
export class TopPerformComponent {
  topPerformData = topPerform
}
