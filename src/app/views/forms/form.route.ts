import type { Route } from '@angular/router'
import { ValidationComponent } from './validation/validation.component'
import { PickrComponent } from './pickr/pickr.component'
import { QuillComponent } from './quill/quill.component'
import { ElementComponent } from './element/element.component'

export const FORMS_ROUTES: Route[] = [
  {
    path: 'elements',
    component: ElementComponent,
    data: { title: 'Basic Elements' },
  },
  {
    path: 'pickers',
    component: PickrComponent,
    data: { title: 'Form Picker' },
  },
  {
    path: 'quilljs',
    component: QuillComponent,
    data: { title: 'Quill' },
  },

  {
    path: 'validation',
    component: ValidationComponent,
    data: { title: 'Form Validation' },
  },
]
