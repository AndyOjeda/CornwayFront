import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://cornwayweb.somee.com/api';
  private tokenKey = 'authToken';
  private usuario: any = null;



  constructor(private http: HttpClient, private router: Router) {}

  //Login de usuario
  login(Correo: string, Clave: string): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('Correo', Correo);
    formData.append('Clave', Clave);

    return this.http.post<any>(`${this.apiUrl}/Usuarios/login`, formData, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Login successful', response);
          if (response.status === 200) {
            localStorage.setItem('Authenticate', true.toString());
            this.getUserInfo().subscribe();
          } else {
            throw new Error('Authentication failed');
          }
        }),
        catchError(error => {
          // Maneja el error de la solicitud HTTP aquí
          console.error('Login failed', error);
          return throwError(error);
        })
      );
  }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}/Usuarios`, { headers }).pipe(
        tap((user: any) => {
          this.usuario = user;
        })
      );
    }
    return new Observable();
  }

  logout(): void {
    // Elimina el token JWT del localStorage
    localStorage.removeItem('Authenticate');
  }
}
