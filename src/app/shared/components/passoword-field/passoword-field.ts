import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'input-passoword-field',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './passoword-field.html',
  styleUrl: './passoword-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassowordField {
    hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
