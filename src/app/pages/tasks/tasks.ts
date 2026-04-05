import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Tasks {
  imgUsuario = 'assets/usuario.svg';
}
