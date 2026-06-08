import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Tasks } from "../tasks/tasks";

@Component({
  selector: 'app-home.componet',
  imports: [MatCardModule, MatIcon, MatButtonModule, Tasks],
  templateUrl: './home.componet.html',
  styleUrl: './home.componet.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponet {
  linkBrasaoPassos = 'https://commons.wikimedia.org/wiki/Special:FilePath/Brasao%20Passos-MG.png';
}
