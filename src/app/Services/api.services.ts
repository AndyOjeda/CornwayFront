import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://cornwayweb.somee.com/api'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) { }


  //get TiposGestionCultivo
  getTiposGestionCultivo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/TiposGestionCultivo`)
      .pipe(
        tap(response => {
          console.log('Get TiposGestionCultivo successful', response);
        }),
        catchError(error => {
          console.error('Get TiposGestionCultivo failed', error);
          return throwError(error);
        })
      );
  }
}
