import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

interface UserRegisterPayload {
  nome: string;
  email: string;
  enderecos?:
    | [
        {
          rua: string;
          numero: number;
          complemento: string;
          cidade: string;
          estado: string;
          cep: string;
        },
      ]
    | null;

  telefones?:
    | [
        {
          numero: string;
          ddd: string;
        },
      ]
    | null;
}

interface UserRegisterResponse {
  nome: string;
  email: string;
  enderecos:
    | [
        {
          rua: string;
          numero: number;
          complemento: string;
          cidade: string;
          estado: string;
          cep: string;
        },
      ]
    | null;

  telefones:
    | [
        {
          numero: string;
          ddd: string;
        },
      ]
    | null;
}

export interface UserResponse {
  nome: string;
  email: string;
  enderecos:
    | [
        {
          rua: string;
          numero: number;
          complemento: string;
          cidade: string;
          estado: string;
          cep: string;
        },
      ]
    | null;

  telefones:
    | [
        {
          numero: string;
          ddd: string;
        },
      ]
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
  private apiUrl = 'http://localhost:8083';

  private jwtHelper = new JwtHelperService();

  user = signal<UserResponse | null>(null);

  constructor(private http: HttpClient, private authService: AuthService) {
      const token = this.authService.getToken();
      if (token) {
        this.getUserEmail(token).subscribe({
          next: (user) => {
            this.user.set(user);  
          }
        });
      }else {
        this.user.set(null);
        console.error('Erro ao carregar usuário do token: Token não encontrado');
      }
  }

  register(bady: UserRegisterPayload): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(`${this.apiUrl}/usuario`, bady);
  }

  login(bady: UserLoginPayload): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/usuario/login`, bady, {
      responseType: 'text' as 'json',
    });
  }

  getUserEmail(token: string): Observable<UserResponse> {
    const email = this.getEmailFromToken(token);

    if (!email) {
      throw new Error('Email não encontrado no token');
    }

    const headers = new HttpHeaders({ Authorization: `${token}` });

    return this.http.get<UserResponse>(`${this.apiUrl}/usuario?email=${email}`, { headers });
    
  }

  
  getEmailFromToken(token: string): string | null {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.sub || null;
    } catch (error) {
      return null;
    }
  }

  getUser() {
    return this.user();
  }
}
