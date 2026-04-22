import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { readonly } from '@angular/forms/signals';
import { catchError, throwError } from 'rxjs';

interface UserRegisterPayload {
  nome: string;
  email: string;
  senha: string;
  enderecos?: {
    rua: string;
    numero: number;
    complemento: string;
    cidade: string;
    estado: string;
    cep: string;
  }[];
  telefones?: {
    numero: string;
    ddd: string;
  }[];
}

export interface UserResponse {
  nome: string;
  email: string;
  enderecos:
    | {
        id: number;
        cep: string;
        rua: string;
        numero: number;
        complemento: string;
        cidade: string;
        estado: string;
      }[]
    | null;
  telefones:
    | {
        id: number;
        numero: string;
        ddd: string;
      }[]
    | null;
}

export interface UserLoginPayload {
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8083'; //TODO: colocar esse carinha num .ENV

  private jwtHelper = new JwtHelperService();

  private _user = signal<UserResponse | null>(null);
  readonly user = this._user.asReadonly();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    const usersSave = this.authService.getUser();
    if (usersSave) {
      this.setUser(usersSave);
    }
  }

  register(body: UserRegisterPayload): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/usuario`, body);
  }

  login(body: UserLoginPayload): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/usuario/login`, body, {
      responseType: 'text' as 'json',
    });
  }

   getEmailFromToken(token: string): string | null {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.sub || null;
    } catch (error) {
      return null;
    }
  }

  getUserEmail(token: string): Observable<UserResponse> {
    const email = this.getEmailFromToken(token);
    if (!email) throw new Error('Token Inválido');
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.get<UserResponse>(`${this.apiUrl}/usuario?email=${email}`, { headers }).pipe(
      tap(user => this.setUser(user))

    );
  }

    deleteUserByEmail(token: string): Observable<void> {
      const email = this.getEmailFromToken(token)
      if (!email) throw new Error('Token Inválido');
      const headers = new HttpHeaders({ Authorization: `${token}` })
      return this.http.delete<void>(`${this.apiUrl}/usuario/${email}`, { headers })
      .pipe(tap(() => this.setUser(null)
         )
      );  
      


    }
    
 
  savePhoneUser(body: { numero: string; ddd: string }, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `${token}` });

    return this.http.post<UserResponse>(`${this.apiUrl}/usuario/telefones`, body, { headers }).pipe(
      switchMap(() => this.getUserEmail(token)),
      tap((user) => {
        this.setUser(user);
        this.authService.saveUser(user);
      }),
    );
  }
  // Todo terminar o uptade telefone

  updatePhoneUser(
    id: number,
    body: { numero: string; ddd: string },
    token: string,
  ): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `${token}` });

    return this.http
      .put<UserResponse>(`${this.apiUrl}/usuario/telefone?id=${id}`, body, { headers })
      .pipe(
        switchMap(() => this.getUserEmail(token)),
        tap((user) => {
          this.setUser(user);
          this.authService.saveUser(user);
        }),
      );
  }

  saveEndereco(
    body: {
      cep: string;
      rua: string;
      numero: number;
      complemento: string;
      cidade: string;
      estado: string;
    },
    token: string,
  ): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `${token}` });

    return this.http.post<UserResponse>(`${this.apiUrl}/usuario/enderecos`, body, { headers }).pipe(
      switchMap(() => this.getUserEmail(token)),
      tap((user) => {
        this.setUser(user);
        this.authService.saveUser(user);
      }),
    );
  }

  updateEnderecoUser(
    id: number,
    body: {
      cep: string;
      rua: string;
      numero: number;
      complemento: string;
      cidade: string;
      estado: string;
    },
    token: string,
  ): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `${token}` });

    return this.http
      .put<UserResponse>(`${this.apiUrl}/usuario/enderecos?id=${id}`, body, { headers })
      .pipe(
        switchMap(() => this.getUserEmail(token)),
        tap((user) => {
          this.setUser(user);
          this.authService.saveUser(user);
        }),
      );
  }

  getEndByCep(cep: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/enderecos/${cep}`);
  }

  getUser(): UserResponse | null {
    return this.user();
  }

  setUser(data: UserResponse | null): void {
    this._user.set(data)
  }
}
