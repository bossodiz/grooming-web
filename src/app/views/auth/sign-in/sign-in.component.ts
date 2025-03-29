import { AuthenticationService } from '@/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { currentYear } from '@common/constants';
import { Store } from '@ngrx/store';
import { login } from '@store/authentication/authentication.actions';
import { getError } from '@store/authentication/authentication.selector';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  currentYear = currentYear;
  signInForm!: UntypedFormGroup;
  submitted: boolean = false;

  errorMessage: string = '';

  public fb = inject(UntypedFormBuilder);
  public store = inject(Store);
  public service = inject(AuthenticationService);

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['1234', [Validators.required]],
    });

    this.signInForm.get('username')?.valueChanges.subscribe(() => {
      this.signInForm.get('username')?.setErrors(null);
      this.signInForm.get('password')?.setErrors(null);
      this.errorMessage = '';
    });

    this.signInForm.get('password')?.valueChanges.subscribe(() => {
      this.signInForm.get('username')?.setErrors(null);
      this.signInForm.get('password')?.setErrors(null);
      this.errorMessage = '';
    });
  }

  get formValues() {
    return this.signInForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.signInForm.valid) {
      const username = this.formValues['username'].value; // Get the username from the form
      const password = this.formValues['password'].value; // Get the password from the form

      // Login Api
      this.store.dispatch(login({ username: username, password: password }));
      this.store.select(getError).subscribe((error) => {
        if (error) {
          this.errorMessage = error;
          this.signInForm.controls['username'].setErrors({ customError: true });
          this.signInForm.controls['password'].setErrors({ customError: true });
        }
      });
    }
  }
}
