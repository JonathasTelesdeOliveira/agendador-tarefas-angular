import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-passoword-field',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    ReactiveFormsModule
  ],

  templateUrl: './passoword-field.html',
  styleUrl: './passoword-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PassowordField {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  @Input({required: true}) control!: FormControl; 

    get passowordError(): String | null {
      const control = this.control;
      if (control?.hasError('required')) {return 'Senha obrigatória!'}
      if (control?.hasError('minlength')) {return 'Senha deve conter no mínimo 6 caracteres.'}
    return null;
  }

}
