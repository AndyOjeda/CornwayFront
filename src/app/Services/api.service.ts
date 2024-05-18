import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://cornwayweb.somee.com/api/Usuarios/login'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(map(response => {
        // Almacenar el token JWT en el localStorage
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      }));
  }

  logout(): void {
    // Elimina el token JWT del localStorage
    localStorage.removeItem('token');
  }

  // Otros métodos relacionados con la autenticación pueden ir aquí
}
