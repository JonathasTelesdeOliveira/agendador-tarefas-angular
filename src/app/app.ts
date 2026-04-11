import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenu } from './shared/components/global/top-menu/top-menu';
import { Flooter } from './shared/components/global/flooter/flooter';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopMenu, Flooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('agendador-tarefas');
}
