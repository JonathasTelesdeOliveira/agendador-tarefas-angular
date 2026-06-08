import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-tasks',
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Tasks {
  imgUsuario = 'assets/usuario.svg';
  private router = inject(Router);
}
