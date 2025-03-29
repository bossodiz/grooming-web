import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { QuillEditorComponent } from 'ngx-quill'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-quill',
    imports: [BreadcrumbComponent, QuillEditorComponent, FormsModule],
    templateUrl: './quill.component.html',
    styles: ``
})
export class QuillComponent {
  content: string = ` <div id="quill-editor" style="height: 400px;">
  <h1>Hello World</h1>
  <p><br></p>
  <h4>This is an simple editable area</h4>
  <p><br></p>
  <ol>
      <li>
          Select a text to reveal the toolbar.
      </li>
      <li>
          Edit rich document on-the-fly, so elastic!
      </li>
  </ol>
  <br>
  <p>Preset build with <code>snow</code> theme, and some common formats.</p>
</div>`
}
