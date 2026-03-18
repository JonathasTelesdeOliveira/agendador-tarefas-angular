import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { PassowordField } from '../../shared/components/passoword-field/passoword-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule, 
  FormGroup, 
  FormBuilder, 
  FormControl, 
  Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
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
    CommonModule
  ],

  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,

  encapsulation: ViewEncapsulation.None
})
export class Register {
  title = 'agendador-tarefas'
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get passowordControl(): FormControl{
    return this.form.get('password') as FormControl
  }

  submit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return 
    }
    console.log("formulario submetido", this.form.value)
  }
}



























