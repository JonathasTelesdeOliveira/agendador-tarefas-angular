import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { PassowordField } from '../../shared/components/passoword-field/passoword-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSelectModule, MatIconModule, MatDividerModule, PassowordField, MatFormFieldModule, MatInputModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,

  encapsulation: ViewEncapsulation.None
})
export class Register {
  title = 'agendador-tarefas'
}
