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
import { MemberService, Response } from '@/app/services/member.service';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '@/app/services/toast.service';
import { ERROR, SUCCESS } from '@common/constants';

@Component({
  selector: 'app-customer-about',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './customer-about.component.html',
  styleUrl: './customer-about.component.scss',
})
export class CustomerAboutComponent {
  @Input() id: any;
  @ViewChild('standardModal') standardModal!: TemplateRef<any>;
  modalData: any = null;

  personalInformationForm!: UntypedFormGroup;
  submit!: boolean;
  phoneError: string = '';
  show1 = true;

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
        tap((response: Response<any>) => {
          this.personalInformationForm.patchValue({
            name: response.data.name ?? '',
            firstname: response.data.firstname ?? '',
            lastname: response.data.lastname ?? '',
            phone: this.phoneFormat(response.data.phone) ?? '',
            phone2: this.phoneFormat(response.data.phoneOther) ?? '',
            email: response.data.email ?? '',
          });
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

  onPhoneInput(event: any): void {
    this.submit = false;
    const input = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    event.target.value = this.phoneFormat(input);
  }

  phoneFormat(value: any): string {
    if (value) {
      if (value.length <= 3) {
        return value;
      } else if (value.length <= 6) {
        return `${value.slice(0, 3)}-${value.slice(3)}`;
      } else {
        return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
      }
    }
    return '';
  }

  validSubmit() {
    this.submit = true;
    if (this.personalInformationForm.get('phone')?.value.length == 0) {
      this.phoneError = 'Please enter a phone';
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
        tap((response: Response<any>) => {
          if (response.code !== 200) {
            this.phoneError = response.message ?? '';
            this.personalInformationForm.get('phone')?.setErrors({
              incorrect: true,
            });
            this.personalInformationForm.get('phone')?.markAsTouched();
          } else {
            this.showToast('Successfully updated', SUCCESS);
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
