import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  imports: [MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Perfil {

  private formBuilder= inject(FormBuilder);
  private userService = inject(UserService);

  user = this.userService.getUser();
  profileForm = this.formBuilder.group({
    nome: [{value: this.user?.nome || '', disabled: true}],
    email: [{value: this.user?.email || '', disabled: true}],
  });

}
