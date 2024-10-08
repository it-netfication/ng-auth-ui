import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormInputFieldTypeEnum } from '../../enums/form-input-field-type.enum';
import { ToastMessageService } from '../../services/toast-message/toast-message.service';
import { passwordMatchValidator } from '../../shared/validators/password-match-validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent {
  signupForm: FormGroup | undefined;
  hide = signal(true);
  formInputFieldTypeEnum = FormInputFieldTypeEnum;

  constructor(
    private toastMessageService: ToastMessageService,
    private router: Router
  ) {
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]*')]),
        lastName: new FormControl('', Validators.pattern('[A-Za-z ]*')),
        phone: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[0-9]*'),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        agreeTerms: new FormControl(false, Validators.requiredTrue),
      },
      { validators: passwordMatchValidator() }
    );
  }

  toggleVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submitSignupForm() {
    if (this.signupForm?.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.toastMessageService.showSuccessMessage(
      'Your account registered successfully!'
    );

    this.router.navigate(['/', 'auth', 'login']);
  }
}
