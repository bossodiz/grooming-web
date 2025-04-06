import {
  Component,
  inject,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MemberService } from '@/app/services/member.service';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '@/app/services/toast.service';
import { ERROR, SUCCESS } from '@common/constants';
import { NgxMaskDirective, NGX_MASK_CONFIG, initialConfig } from 'ngx-mask';

@Component({
  selector: 'app-customer-about',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './customer-about.component.html',
  styleUrl: './customer-about.component.scss',
  standalone: true,
  providers: [
    {
      provide: NGX_MASK_CONFIG,
      useValue: initialConfig,
    },
  ],
})
export class CustomerAboutComponent {
  @Input() id: any;
  @ViewChild('standardModal') standardModal!: TemplateRef<any>;
  modalData: any = null;

  personalInformationForm!: UntypedFormGroup;
  submit!: boolean;
  phoneError: string = '';
  phone2Error: string = '';
  show1 = true;
  remark: string = '';

  toastService = inject(ToastService);

  constructor(
    private memberService: MemberService,
    private formBuilder: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.getData();
    this.personalInformationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      firstname: [''],
      lastname: [''],
      phone: ['', [Validators.required]],
      phone2: [''],
      email: ['', [Validators.email]],
    });
  }

  get form() {
    return this.personalInformationForm.controls;
  }

  getData() {
    this.memberService
      .getCustomerId(Number(this.id))
      .pipe(
        tap((response) => {
          this.personalInformationForm.patchValue({
            name: response.data.name ?? '',
            firstname: response.data.firstname ?? '',
            lastname: response.data.lastname ?? '',
            phone: response.data.phone ?? '',
            phone2: response.data.phoneOther ?? '',
            email: response.data.email ?? '',
          });
          this.remark = response.data.remark ?? '';
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  getDataRemark()
  {
    this.memberService
      .getCustomerRemark(Number(this.id))
      .pipe(
        tap((response) => {
          this.remark = response.data.remark ?? '';
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  reset() {
    this.getData();
  }

  resetRemark() {
    this.getDataRemark();
  }

  onPhoneInput(event: any): void {
    this.submit = false;
  }

  validSubmit() {
    this.submit = true;
    if (this.personalInformationForm.get('phone')?.value.length == 0) {
      this.phoneError = 'Please enter a phone';
    }
    if (this.personalInformationForm.get('phone')?.errors?.['mask'] !== null) {
      this.phoneError = 'Please enter a phone format : 000-000-0000';
    }
    if (this.personalInformationForm.get('phone2')?.errors?.['mask'] !== null) {
      this.phone2Error = 'Please enter a phone 2 format: 000-000-0000';
    }
    if (this.personalInformationForm.valid) {
      this.save();
    }
  }

  save() {
    const request = {
      id: this.id,
      name: this.personalInformationForm.get('name')?.value,
      firstname: this.personalInformationForm.get('firstname')?.value,
      lastname: this.personalInformationForm.get('lastname')?.value,
      phone: this.personalInformationForm.get('phone')?.value.replace(/-/g, ''),
      phone2: this.personalInformationForm
        .get('phone2')
        ?.value.replace(/-/g, ''),
      email: this.personalInformationForm.get('email')?.value,
    };
    this.memberService
      .updateProfile(request)
      .pipe(
        tap((response) => {
          if (response.code !== 200) {
            this.phoneError = response.message ?? '';
            this.personalInformationForm.get('phone')?.setErrors({
              incorrect: true,
            });
            this.personalInformationForm.get('phone')?.markAsTouched();
          } else {
            this.showToast('Successfully updated profile', SUCCESS);
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  saveRemark() {
    const request = {
      id: this.id,
      remark: this.remark,
    };
    this.memberService
      .updateProfileRemark(request)
      .pipe(
        tap((response) => {
          if (response.code == 200) {
            this.showToast('Successfully updated remark', SUCCESS);
          } 
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  showToast(msg: string, type: string) {
    if (type === SUCCESS) {
      this.toastService.show({
        textOrTpl: msg,
        classname: 'bg-success text-white',
        delay: 3000,
      });
    } else if (type === ERROR) {
      this.toastService.show({
        textOrTpl: msg,
        classname: 'bg-danger text-white',
        delay: 3000,
      });
    }
  }
}
