import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PassowordField } from '../../shared/components/passoword-field/passoword-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserLoginPayload, UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    PassowordField,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Login {
  form: FormGroup<{email: FormControl<string>; senha: FormControl<string>}>;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control ('', {validators: [Validators.required, Validators.email], nonNullable: true}),
      senha: this.formBuilder.control ('', {validators: [Validators.required, Validators.minLength(6)], nonNullable: true}),
    });
  }

  get passowordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  get emailError(): string | null {
    const control = this.form.get('email');
    if (control?.hasError('required')) {
      return 'O email obrigatório!';
    }
    if (control?.hasError('email')) {
      return 'Digite um email válido!.';
    }
    return null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value as UserLoginPayload;
    
    this.isLoading = true;

    this.userService
      .login(formData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erro ao Logar', error);
        },
      });
  }
}
