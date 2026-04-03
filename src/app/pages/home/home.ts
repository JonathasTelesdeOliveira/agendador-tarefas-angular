import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Home {
  imgHero = 'assets/img-hero.png';

}
