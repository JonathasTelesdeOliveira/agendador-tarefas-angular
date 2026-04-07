import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterStateService } from '../../../../core/router/router-state.service';
import {MatCardModule} from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterModule, 
    MatCardModule, MatMenuModule],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TopMenu implements OnInit, OnDestroy {
  applogo = 'assets/logo.png';
  rotaAtual: string = '';
  inscricaoptRota!: Subscription;

  private routerStateService = inject(RouterStateService);
  private authService = inject(AuthService);  
  private userService = inject(UserService);
  private route = inject(Router);

  ngOnInit(): void {
    this.inscricaoptRota = this.routerStateService.rotaAtual$.subscribe((url) => {
      this.rotaAtual = url;
    });
  }

  ngOnDestroy(): void {
    this.inscricaoptRota.unsubscribe();
  }

  estaNaRotaRegister(): boolean {
    return this.rotaAtual === '/register';
  }
  estanaRotaLogin(): boolean {
    return this.rotaAtual === '/login';
  }

  get estalogado(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['']);
  }

  get estaLogado(): string {
   const user =  this.userService.getUser();
   if (user && user.nome) {
    return user.nome.toUpperCase();
   }
   return 'Nome não disponível';
  }
}
