import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://cornwayweb.somee.com/api'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

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

  logout(): void {
    // Elimina el token JWT del localStorage
    localStorage.removeItem('Authenticate');
  }

  //Post de usuario
  register(Nombres: string, Apellidos: string, Correo: string, Clave: string, IdTipoUsuario: number): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('Nombres', Nombres);
    formData.append('Apellidos', Apellidos);
    formData.append('Correo', Correo);
    formData.append('Clave', Clave);
    formData.append('IdTipoUsuario', IdTipoUsuario.toString());

    return this.http.post<any>(`${this.apiUrl}/Usuarios`, formData, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Login successful', response);
          if (response.status === 201) {
            localStorage.setItem('Authenticate', true.toString());
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
  // Otros métodos relacionados con la autenticación pueden ir aquí
}
