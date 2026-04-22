import { Component, inject, ViewEncapsulation} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, RouterLink],
  encapsulation: ViewEncapsulation.None,

})
export class Home {
  imgHero = 'assets/img-hero.png';

  private router = inject(Router);
  private authService = inject(AuthService);

    ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
    }
  }

}
