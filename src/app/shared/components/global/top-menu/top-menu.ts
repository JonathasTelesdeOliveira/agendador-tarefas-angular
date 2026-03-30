import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterStateService } from '../../../../core/router/router-state.service';

@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterModule],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TopMenu implements OnInit, OnDestroy {
  applogo = 'assets/logo.png';
  rotaAtual: string = '';
  inscricaoptRota!: Subscription;

  private routerStateService = inject(RouterStateService);

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
}
