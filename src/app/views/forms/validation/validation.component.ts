import { Component, inject } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-validation',
    imports: [
        BreadcrumbComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './validation.component.html',
    styles: ``
})
export class ValidationComponent {
  validationform!: UntypedFormGroup
  tooltipvalidationform!: UntypedFormGroup
  customValidationForm!: UntypedFormGroup
  supportedForm!: UntypedFormGroup
  submit!: boolean
  formsubmit!: boolean
  cuSubmit!: boolean

  public formBuilder = inject(UntypedFormBuilder)

  ngOnInit(): void {
    this.validationform = this.formBuilder.group({
      firstName: [
        'Mark',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      lastName: [
        'Otto',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      terms: ['', [Validators.required]],
    })

    this.tooltipvalidationform = this.formBuilder.group({
      firstName: [
        'Mark',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      lastName: [
        'Otto',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    })
  }

  get form() {
    return this.validationform.controls
  }

  get formData() {
    return this.tooltipvalidationform.controls
  }

  validSubmit() {
    this.submit = true
  }

  formSubmit() {
    this.formsubmit = true
  }
}
