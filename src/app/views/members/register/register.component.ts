import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import {
  Response,
  CustomerDetail,
  MemberService,
} from '@/app/services/member.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModalModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild('standardModal') standardModal!: TemplateRef<any>;
  modalData: any = null;

  registerForm!: UntypedFormGroup;
  submit!: boolean;
  usernameError: string = '';
  contentModal: string = '';
  isSuccess!: boolean;

  public formBuilder = inject(UntypedFormBuilder);
  public service = inject(MemberService);
  private modalService = inject(NgbModal);

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      nickname: ['', Validators.required],
      firstname: [''],
      lastname: [''],
      phone2: [''],
      password: [''],
      confirmPassword: [''],
      email: [''],
      phone1: [''],
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  onPhoneInput(event: any): void {
    this.submit = false;
    const input = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    if (input.length <= 3) {
      event.target.value = input;
    } else if (input.length <= 6) {
      event.target.value = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else {
      event.target.value = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
    }
  }

  validSubmit() {
    this.submit = true;
    var phone = this.registerForm.get('username')?.value.replace(/-/g, '');
    if (phone.length == 0) {
      this.usernameError = 'Please enter a phone.';
    } else if (phone.length < 8) {
      this.usernameError = 'Phone must be at least 9 characters long.';
    } else {
      this.usernameError = '';
    }
    if (this.registerForm.valid) {
      this.register(this.registerForm.value);
    }
  }

  clear() {
    this.submit = false;
  }

  register(formData: any) {
    const username = formData.username!.replace(/-/g, '');
    const request = {
      ...formData,
      username: username,
      phone1: username,
    };
    this.service
      .register(request)
      .pipe(
        tap((response: Response<CustomerDetail>) => {
          this.isSuccess = true;
          let contentModal =
            (this.registerForm.get('username')?.value ?? '') +
            ' : ' +
            (response.message ?? '');
          this.open(this.standardModal, response.data, contentModal);
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  open(content: TemplateRef<any>, data?: any, message?: string) {
    this.modalData = {
      message: message,
      data: data,
    };
    this.modalService.open(content);
  }

  payment(data: any) {
    console.log(data);
    alert('Go to payment');
  }
}
