import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://cornway.somee.com/api';


  constructor(private http: HttpClient, private router: Router) {}

  filterObjectsById(objects: any[], idToFilter: number): any[] {
    return objects.filter(obj => obj.id === idToFilter);
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


  private handleError(error: Error) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }


  //get Cultivos
  getCultivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Cultivos`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //get Cultivo por id
  getCultivo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Cultivos/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Create Cultivo
  CreateCultivo(IdUsuario: number, Nombre: string, IdTipoCultivo: number, Area: string): Observable<any> {
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
  //delete Cultivo
  deleteCultivo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Cultivos/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //update Cultivo
  updateCultivo(IdCultivo: number, IdUsuario: number, Nombre: string, IdTipoCultivo: number, Area: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdCultivo', IdCultivo.toString());
    formData.append('IdUsuario', IdUsuario.toString());
    formData.append('Nombre', Nombre);
    formData.append('IdTipoCultivo', IdTipoCultivo.toString());
    formData.append('Area', Area);

    return this.http.put<any>(`${this.apiUrl}/Cultivos`, formData, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Cultivo actualizado exitosamente', response);
          if (response.status === 200) {
            console.log('Cultivo actualizado con éxito');
          } else {
            throw new Error('Error al actualizar el cultivo');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar el cultivo', error);
          return throwError(error);
        })
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



  //get TiposGestionCultivo
  getTiposGestionCultivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/TiposGestionCultivo`)
      .pipe(
        catchError(this.handleError)
      );

  }
  //get TiposGestionCultivo por id
  getTiposGestionCultivo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/TiposGestionCultivo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //CreateTiposGestionCultivo
  CreateTiposGestionCultivo(Nombre: string): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('Nombre', Nombre);

    return this.http.post<any>(`${this.apiUrl}/TiposGestionCultivo`, formData, { observe: 'response' })
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
  //delete TiposGestionCultivo
  deleteTiposGestionCultivo(id: number): Observable<any> {
    return this.http.delete<any>(`[{this.apiUrl}/TiposGestionCultivo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //update TiposGestionCultivo
  updateTiposGestionCultivo(IdTipoGestionCultivo: number, Nombre: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdTipoGestionCultivo', IdTipoGestionCultivo.toString());
    formData.append('Nombre', Nombre);

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.put<any>(`${this.apiUrl}/TiposGestionCultivo/${IdTipoGestionCultivo}`, formData, { headers, observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Tipo de gestión actualizado exitosamente', response);
          if (response.status === 200) {
            console.log('Tipo de gestión actualizado con éxito');
          } else {
            throw new Error('Error al actualizar el tipo de gestión');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar el tipo de gestión', error);
          return throwError(error);
        })
      );
  }



  //get TipoUsuario
  getTipoUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/TipoUsuario`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //get TipoUsuario por id
  getTipoUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/TipoUsuario/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Create TipoUsuario
  CreateTipoUsuario(Nombre: string): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('Nombre', Nombre);

    return this.http.post<any>(`${this.apiUrl}/TipoUsuario`, formData, { observe: 'response' })
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
  //delete TipoUsuario
  deleteTipoUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`[{this.apiUrl}/TipoUsuario/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //update TipoUsuario
  updateTipoUsuario(IdTipoUsuario: number, Nombre: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdTipoUsuario', IdTipoUsuario.toString());
    formData.append('Nombre', Nombre);

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.put<any>(`${this.apiUrl}/TipoUsuario/${IdTipoUsuario}`, formData, { headers, observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Tipo de usuario actualizado exitosamente', response);
          if (response.status === 200) {
            console.log('Tipo de usuario actualizado con éxito');
          } else {
            throw new Error('Error al actualizar el tipo de usuario');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar el tipo de usuario', error);
          return throwError(error);
        })
      );
  }



  //get InsumosGestionCultivo(IdInsumoCultivo,Nombre:string,Dois:number,Unidad:string)
  getInsumosGestionCultivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/InsumoGestionCultivo`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //get InsumosGestionCultivo por id
  getInsumoGestionCultivo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/InsumoGestionCultivo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Create InsumosGestionCultivo
  CreateInsumoGestionCultivo(IdInsumoCultivo: number, Nombre: string, Dosis: number, Unidad: string): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('IdInsumoCultivo', IdInsumoCultivo.toString());
    formData.append('Nombre', Nombre);
    formData.append('Dosis', Dosis.toString());
    formData.append('Unidad', Unidad);

    return this.http.post<any>(`${this.apiUrl}/InsumoGestionCultivo`, formData, { observe: 'response' })
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
  //delete InsumosGestionCultivo
  deleteInsumoGestionCultivo(id: number): Observable<any> {
    return this.http.delete<any>(`[{this.apiUrl}/InsumoGestionCultivo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //update InsumosGestionCultivo
  updateInsumoGestionCultivo(IdInsumoGestionCultivo: number, Nombre: string, Dois: number, Unidad: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdInsumoGestionCultivo', IdInsumoGestionCultivo.toString());
    formData.append('Nombre', Nombre);
    formData.append('Dois', Dois.toString());
    formData.append('Unidad', Unidad);

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.put<any>(`${this.apiUrl}/InsumoGestionCultivo/${IdInsumoGestionCultivo}`, formData, { headers, observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Insumo actualizado exitosamente', response);
          if (response.status === 200) {
            console.log('Insumo actualizado con éxito');
          } else {
            throw new Error('Error al actualizar el insumo');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar el insumo', error);
          return throwError(error);
        })
      );
  }


  //get Partida
  getPartidas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Partida`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //get Partida por id
  getPartida(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Partida/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Create Partida(IdCosecha, Monedas)
  CreatePartida(IdCosecha: number, Monedas: number): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('IdCosecha', IdCosecha.toString());
    formData.append('Monedas', Monedas.toString());

    return this.http.post<any>(`${this.apiUrl}/Partida`, formData, { observe: 'response' })
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
  //delete Partida
  deletePartida(id: number): Observable<any> {
    return this.http.delete<any>(`[{this.apiUrl}/Partida/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //update Partida
  updatePartida(IdPartida: number, IdCosecha: number, Monedas: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdPartida', IdPartida.toString());
    formData.append('IdCosecha', IdCosecha.toString());
    formData.append('Monedas', Monedas.toString());

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.put<any>(`${this.apiUrl}/Partida/${IdPartida}`, formData, { headers, observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Partida actualizada exitosamente', response);
          if (response.status === 200) {
            console.log('Partida actualizada con éxito');
          } else {
            throw new Error('Error al actualizar la partida');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar la partida', error);
          return throwError(error);
        })
      );
  }



  //get InsumoCultivo
  getInsumosCultivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/InsumoCultivo`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //get InsumoCultivo por id
  getInsumoCultivo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/InsumoCultivo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Create InsumoCultivo(IdTipoInsumoGestionCultivo, Cantidad)
  CreateInsumoCultivo(IdTipoInsumoGestionCultivo: number, Cantidad: number): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('IdTipoInsumoGestionCultivo', IdTipoInsumoGestionCultivo.toString());
    formData.append('Cantidad', Cantidad.toString());

    return this.http.post<any>(`${this.apiUrl}/InsumoCultivo`, formData, { observe: 'response' })
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
  //delete InsumoCultivo
  deleteInsumoCultivo(id: number): Observable<any> {
    return this.http.delete<any>(`[{this.apiUrl}/InsumoCultivo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //update InsumoCultivo
  updateInsumoCultivo(IdInsumoCultivo: number, IdTipoInsumoGestionCultivo: number, Cantidad: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdInsumoCultivo', IdInsumoCultivo.toString());
    formData.append('IdTipoInsumoGestionCultivo', IdTipoInsumoGestionCultivo.toString());
    formData.append('Cantidad', Cantidad.toString());

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.put<any>(`${this.apiUrl}/InsumoCultivo/${IdInsumoCultivo}`, formData, { headers, observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Insumo actualizado exitosamente', response);
          if (response.status === 200) {
            console.log('Insumo actualizado con éxito');
          } else {
            throw new Error('Error al actualizar el insumo');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar el insumo', error);
          return throwError(error);
        })
      );
  }


  //get TipoCultivo
  getTiposCultivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/TiposCultivo`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //get TipoCultivo por id
  getTipoCultivo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/TiposCultivo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Create TipoCultivo
  CreateTipoCultivo(Nombre: string): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('Nombre', Nombre);

    return this.http.post<any>(`${this.apiUrl}/TiposCultivo`, formData, { observe: 'response' })
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
  //delete TipoCultivo
  deleteTipoCultivo(id: number): Observable<any> {
    return this.http.delete<any>(`[{this.apiUrl}/TiposCultivo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //update TipoCultivo
  updateTipoCultivo(IdTipoCultivo: number, Nombre: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdTipoCultivo', IdTipoCultivo.toString());
    formData.append('Nombre', Nombre);

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.put<any>(`${this.apiUrl}/TiposCultivo/${IdTipoCultivo}`, formData, { headers, observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Tipo de cultivo actualizado exitosamente', response);
          if (response.status === 200) {
            console.log('Tipo de cultivo actualizado con éxito');
          } else {
            throw new Error('Error al actualizar el tipo de cultivo');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar el tipo de cultivo', error);
          return throwError(error);
        })
      );
  }


  //get GestionesCultivo
  getGestionesCultivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GestionesCultivo`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //get GestionesCultivo por id
  getGestionCultivo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GestionesCultivo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Create GestionesCultivo(IdCultivo, IdTipoGestionCultivo, IdInsumoGestionCultivo, FechaGestion, Comentario)
  CreateGestionCultivo(IdCultivo: number, IdTipoGestionCultivo: number, IdInsumoGestionCultivo: number, FechaGestion: string, Comentario: string): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('IdCultivo', IdCultivo.toString());
    formData.append('IdTipoGestionCultivo', IdTipoGestionCultivo.toString());
    formData.append('IdInsumoGestionCultivo', IdInsumoGestionCultivo.toString());
    formData.append('FechaGestion', FechaGestion);
    formData.append('Comentario', Comentario);

    return this.http.post<any>(`${this.apiUrl}/GestionesCultivo`, formData, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Gestión creada exitosamente', response);
          if (response.status === 201) {
            console.log('Gestión creada con éxito');
          } else {
            throw new Error('Error al crear la gestión');
          }
        }),
        catchError(error => {
          console.error('Error al crear la gestión', error);
          return throwError(error);
        })
      );
  }
  //delete GestionesCultivo
  deleteGestionCultivo(id: number): Observable<any> {
    return this.http.delete<any>(`[{this.apiUrl}/GestionesCultivo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //update GestionesCultivo
  updateGestionCultivo(IdGestionCultivo: number, IdCultivo: number, IdTipoGestionCultivo: number, IdInsumoGestionCultivo: number, FechaGestion: string, Comentario: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdGestionCultivo', IdGestionCultivo.toString());
    formData.append('IdCultivo', IdCultivo.toString());
    formData.append('IdTipoGestionCultivo', IdTipoGestionCultivo.toString());
    formData.append('IdInsumoGestionCultivo', IdInsumoGestionCultivo.toString());
    formData.append('FechaGestion', FechaGestion);
    formData.append('Comentario', Comentario);

    return this.http.put<any>(`${this.apiUrl}/GestionesCultivo`, formData, { observe: 'response' })
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


  //get Usuarios
  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Usuarios`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //get Usuario por id
  getUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Usuarios/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Create Usuario(IdTipoUsuario, Nombres, Apellidos, Correo, Clave)
  CreateUsuario(IdTipoUsuario: number, Nombres: string, Apellidos: string, Correo: string, Clave: string): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('IdTipoUsuario', IdTipoUsuario.toString());
    formData.append('Nombres', Nombres);
    formData.append('Apellidos', Apellidos);
    formData.append('Correo', Correo);
    formData.append('Clave', Clave);

    return this.http.post<any>(`${this.apiUrl}/Usuarios`, formData, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Usuario creado exitosamente', response);
          if (response.status === 201) {
            console.log('Usuario creado con éxito');
          } else {
            throw new Error('Error al crear el usuario');
          }
        }),
        catchError(error => {
          console.error('Error al crear el usuario', error);
          return throwError(error);
        })
      );
  }
  //delete Usuario
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`[{this.apiUrl}/Usuarios/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //update Usuario
  updateUsuario(IdUsuario: number, IdTipoUsuario: number, Nombres: string, Apellidos: string, Correo: string, Clave: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdUsuario', IdUsuario.toString());
    formData.append('IdTipoUsuario', IdTipoUsuario.toString());
    formData.append('Nombres', Nombres);
    formData.append('Apellidos', Apellidos);
    formData.append('Correo', Correo);
    formData.append('Clave', Clave);

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.put<any>(`${this.apiUrl}/Usuarios/${IdUsuario}`, formData, { headers, observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Usuario actualizado exitosamente', response);
          if (response.status === 200) {
            console.log('Usuario actualizado con éxito');
          } else {
            throw new Error('Error al actualizar el usuario');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar el usuario', error);
          return throwError(error);
        })
      );
  }


  //get Cosecha
  getCosechas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Cosecha`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //get Cosecha por id
  getCosecha(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Cosecha/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Create Cosecha(IdCultivo, Cantidad, Fecha)
  CreateCosecha(IdCultivo: number, Cantidad: number, Fecha: string): Observable<any> {
    // Crea una instancia de FormData y añade los campos de email y password
    const formData: FormData = new FormData();
    formData.append('IdCultivo', IdCultivo.toString());
    formData.append('Cantidad', Cantidad.toString());
    formData.append('Fecha', Fecha);

    return this.http.post<any>(`${this.apiUrl}/Cosecha`, formData, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Cosecha creada exitosamente', response);
          if (response.status === 201) {
            console.log('Cosecha creada con éxito');
          } else {
            throw new Error('Error al crear la cosecha');
          }
        }),
        catchError(error => {
          console.error('Error al crear la cosecha', error);
          return throwError(error);
        })
      );
  }
  //delete Cosecha
  deleteCosecha(id: number): Observable<any> {
    return this.http.delete<any>(`[{this.apiUrl}/Cosecha/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //update Cosecha
  updateCosecha(IdCosecha: number, IdCultivo: number, Cantidad: number, Fecha: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IdCosecha', IdCosecha.toString());
    formData.append('IdCultivo', IdCultivo.toString());
    formData.append('Cantidad', Cantidad.toString());
    formData.append('Fecha', Fecha);

    return this.http.put<any>(`${this.apiUrl}/Cosecha`, formData, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Cosecha actualizada exitosamente', response);
          if (response.status === 200) {
            console.log('Cosecha actualizada con éxito');
          } else {
            throw new Error('Error al actualizar la cosecha');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar la cosecha', error);
          return throwError(error);
        })
      );
  }
}
