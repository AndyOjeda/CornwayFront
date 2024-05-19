import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
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

  //Post de usuario - Registro Usuario
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


  getCultivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Cultivos`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTiposCultivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/TiposCultivo`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateGestion(IdGestionCultivo: number, IdCultivo: number, IdTipoGestionCultivo: number, IdInsumoGestionCultivo: number, FechaGestion: string, Comentario: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdGestionCultivo', IdGestionCultivo.toString());
    formData.append('IdCultivo', IdCultivo.toString());
    formData.append('IdTipoGestionCultivo', IdTipoGestionCultivo.toString());
    formData.append('IdInsumoGestionCultivo', IdInsumoGestionCultivo.toString());
    formData.append('FechaGestion', FechaGestion);
    formData.append('Comentario', Comentario);

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.put<any>(`${this.apiUrl}/gestiones/${IdGestionCultivo}`, formData, { headers, observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Gestión actualizada exitosamente', response);
          if (response.status === 200) {
            console.log('Gestión actualizada con éxito');
          } else {
            throw new Error('Error al actualizar la gestión');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar la gestión', error);
          return throwError(error);
        })
      );
  }


  getGestion(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GestionesCultivo`)
      .pipe(
        catchError(this.handleError)
      );
  }

    private handleError(error: Error) {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      }

  CreateCultivo(IdUsuario: number,Nombre: string, IdTipoCultivo: number, Area: string): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('IdUsuario', IdUsuario.toString());
    formData.append('Nombre', Nombre);
    formData.append('IdTipoCultivo', IdTipoCultivo.toString());
    formData.append('Area', Area);

    return this.http.post<any>(`${this.apiUrl}/Cultivos`, formData, { observe: 'response' })
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

  deleteCultivo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Cultivos/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //get TiposInsumoGestionCultivos
getTiposInsumoGestionCultivos(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/TiposInsumoGestionCultivo`)
    .pipe(
      catchError(this.handleError)
    );
}
//get TiposInsumoGestionCultivo por id
getTiposInsumoGestionCultivo(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/TiposInsumoGestionCultivo/${id}`)
    .pipe(
      catchError(this.handleError)
    );
}

//CreateTiposInsumoGestionCultivo
CreateTiposInsumoGestionCultivo(Nombre: string): Observable<any> {
  // Crea una instancia de FormData y añade los campos de email y password
  const formData: FormData = new FormData();
  formData.append('Nombre', Nombre);

  return this.http.post<any>(`${this.apiUrl}/TiposInsumoGestionCultivo`, formData, { observe: 'response' })
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
//delete TiposInsumoGestionCultivo
deleteTiposInsumoGestionCultivo(id: number): Observable<any> {
  return this.http.delete<any>(`[{this.apiUrl}/TiposInsumoGestionCultivo/${id}`)
    .pipe(
      catchError(this.handleError)
    );
}


//Put TiposInsumoGestionCultivo
updateTiposInsumoGestionCultivo(IdTipoInsumoGestionCultivo: number, Nombre: string): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('IdTipoInsumoGestionCultivo', IdTipoInsumoGestionCultivo.toString());
  formData.append('Nombre', Nombre);

  const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

  return this.http.put<any>(`${this.apiUrl}/TiposInsumoGestionCultivo/${IdTipoInsumoGestionCultivo}`, formData, { headers, observe: 'response' })
    .pipe(
      tap(response => {
        console.log('Tipo de insumo actualizado exitosamente', response);
        if (response.status === 200) {
          console.log('Tipo de insumo actualizado con éxito');
        } else {
          throw new Error('Error al actualizar el tipo de insumo');
        }
      }),
      catchError(error => {
        console.error('Error al actualizar el tipo de insumo', error);
        return throwError(error);
      })
    );
}

}
