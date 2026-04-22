import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';

export interface DialogField {
  name: string;
  label: string;
  value?: string | number;
  button?: { icon: string, callback: (value: string, dialogRef: MatDialogRef<ModalDialogComponent>) => void }
  // type?: 'text' | 'number' | 'date' | 'time' | 'datetime';
  type?: string;
  validators?: any[];
}

interface DialogData {
  title: string;
  formconfig: DialogField[];
}

@Component({
  selector: 'app-modal-dialog.component',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule
  ],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
})
export class ModalDialogComponent {
  readonly formBuilder = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<ModalDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  fields: DialogField[] = this.data.formconfig;

  private buildeControls(): Record<string, any> {
    const controls: Record<string, any> = {}

    this.fields.forEach((fild) => {
      controls[fild.name] = [fild.value ?? '', fild.validators || []];
    });
    return controls;
  }

  form: FormGroup = this.formBuilder.group(this.buildeControls());

  onSave() {
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
