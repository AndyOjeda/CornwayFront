import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://cornwayweb.somee.com/api/Usuarios/login';// Cambia esto por tu URL de autenticación

  constructor(private http: HttpClient) { }

  login(Correo: string, Clave: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('Correo', Correo);
    formData.append('Clave', Clave);

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
