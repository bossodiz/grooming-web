import { AfterViewInit, Component } from '@angular/core'
import { tasks } from '../data'
import feather from 'feather-icons'

@Component({
    selector: 'app-widget-task',
    imports: [],
    templateUrl: './widget-task.component.html',
    styles: ``
})
export class WidgetTaskComponent implements AfterViewInit {
  tasks = tasks
  ngAfterViewInit() {
    feather.replace()
  }
}
