import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
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
import { UserService } from '../../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatSelectModule,
    PassowordField,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],

  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Register {
  // title = 'agendador-tarefas'
  form: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
    }
  }

  get passowordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  get emailError(): string | null {
    const control = this.form.get('email');
    if (control?.hasError('required')) {
      return 'O email é obrigatório!';
    }
    if (control?.hasError('email')) {
      return 'Digite um email válido!.';
    }
    return null;
  }

  get nomeError(): string | null {
    const control = this.form.get('nome');
    if (control?.hasError('required')) {
      return 'O nome é obrigatório!';
    }
    if (control?.hasError('minlength')) {
      return 'O nome tem menos de 3 letras.';
    }
    return null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;
    this.isLoading = true;
    this.userService
      .register(formData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erro ao registrar usuário', error);
        },
      });
  }
}
