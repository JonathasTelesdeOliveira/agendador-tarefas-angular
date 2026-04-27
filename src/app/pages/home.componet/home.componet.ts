import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home.componet',
  imports: [MatCardModule, MatIcon, MatButtonModule],
  templateUrl: './home.componet.html',
  styleUrl: './home.componet.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponet {}
