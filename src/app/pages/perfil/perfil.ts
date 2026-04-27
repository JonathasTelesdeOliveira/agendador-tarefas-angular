import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  DialogField,
  ModalDialogComponent,
} from '../../shared/components/modal-dialog.component/modal-dialog.component';
import { AuthService } from '../../services/auth.service';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-perfil',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Perfil {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  readonly dialog = inject(MatDialog);

  user = this.userService.user;
  profileForm = this.formBuilder.group({
    nome: [{ value: this.user()?.nome || '', disabled: true }],
    email: [{ value: this.user()?.email || '', disabled: true }],
  });

  buscaPeloCep(cep: string, dialogRef: MatDialogRef<ModalDialogComponent, any>) {
    this.userService.getEndByCep(cep).subscribe({
      next: (response) => {
        dialogRef.componentInstance.form.patchValue({
          rua: response.logradouro,
          cidade: response.localidade,
          estado: response.estado,
          uf: response.uf,
        });
      },
      error: () => console.warn('Cep não enocontrado.'),
    });
  }

  cadastrarEndereco(): void {
    const token = this.authService.getToken();
    if (!token) return;

    const formconfig: DialogField[] = [
      {
        name: 'cep',
        label: 'CEP',
        button: { icon: 'search', callback: (cep: string) => this.buscaPeloCep(cep, dialogRef) },
        validators: [Validators.required],
      },
      { name: 'rua', label: 'Rua' },
      { name: 'numero', label: 'Número', type: 'number' },
      { name: 'complemento', label: 'Complemento' },
      { name: 'cidade', label: 'Cidade' },
      { name: 'estado', label: 'Estado' },
      { name: 'uf', label: 'Uf' },
    ];

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Adicionar Endereço', formconfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.userService.saveEndereco(result, token).subscribe({
          next: () => console.log('Endereço cadastrado com sucesso:', result),
          error: () => console.log('Erro ao cadastrar Endereço:', result),
        });
      }
    });
  }

  editarEndereco(endereco: {
    id: number;
    cep: string;
    rua: string;
    numero: number;
    complemento: string;
    cidade: string;
    estado: string;
    uf: string;
  }) {
    const token = this.authService.getToken();
    if (!token) return;

    const formconfig: DialogField[] = [
      {
        name: 'cep',
        label: 'CEP',
        value: endereco.cep,
        button: { icon: 'search', callback: (cep: string) => this.buscaPeloCep(cep, dialogRef) },
        validators: [Validators.required],
      },
      { name: 'rua', label: 'Rua', value: endereco.rua },
      { name: 'numero', label: 'Número', type: 'number', value: endereco.numero },
      { name: 'complemento', label: 'Complemento', value: endereco.complemento },
      { name: 'cidade', label: 'Cidade', value: endereco.cidade },
      { name: 'estado', label: 'Estado', value: endereco.estado },
      { name: 'uf', label: 'Uf', value: endereco.uf },
    ];

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Adicionar Endereço', formconfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateEnderecoUser(endereco.id, result, token).subscribe({
          next: () => console.log('Endereço editrado com sucesso:', result),
          error: () => console.log('Erro ao editrar Endereço:', result),
        });
      }
    });
  }

  deletarEndereco(endereco: { id: number }) {
    const token = this.authService.getToken();
    if (!token) return;
    return this.userService.deleteEnderecoUser(endereco.id, token).subscribe({
      next: () => console.log('Telefone cadastrado com sucesso:'),
      error: () => console.log('Erro ao cadastrar telefone:'),
    });
  }

  cadastrarTelefone(): void {
    const token = this.authService.getToken();
    if (!token) return;

    const formconfig: DialogField[] = [
      { name: 'ddd', label: 'DDD', validators: [Validators.required] },
      { name: 'numero', label: 'Numero', validators: [Validators.required] },
    ];

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Adicionar Telefone', formconfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.savePhoneUser(result, token).subscribe({
          next: () => console.log('Telefone cadastrado com sucesso:', result),
          error: () => console.log('Erro ao cadastrar telefone:', result),
        });
      }
    });
  }

  editarTelefone(telefone: { id: number; ddd: string; numero: string }) {
    const token = this.authService.getToken();
    if (!token) return;

    const formconfig: DialogField[] = [
      { name: 'ddd', label: 'DDD', value: telefone.ddd, validators: [Validators.required] },
      {
        name: 'numero',
        label: 'Numero',
        value: telefone.numero,
        validators: [Validators.required],
      },
    ];

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Editar Telefone', formconfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updatePhoneUser(telefone.id, result, token).subscribe({
          next: () => console.log('Telefone editrado com sucesso:', result),
          error: () => console.log('Erro ao editrar telefone:', result),
        });
      }
    });
  }

    deletarTelefone(telefone: { id: number }) {
    const token = this.authService.getToken();
    if (!token) return;
    return this.userService.deleteTelefoneUser(telefone.id, token).subscribe({
      next: () => console.log('Telefone deletado com sucesso:'),
      error: () => console.log('Erro ao deletar telefone:'),
    });
  }
}
