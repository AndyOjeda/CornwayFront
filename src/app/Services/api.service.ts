import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LogginService {

  constructor(private http: HttpClient) { }


  createUser(usuario: UsuarioLogin) {

    const URL = 'http://www.calypsotech.it/api/register';

    const json = {
      name: usuario.nombre,
      surname: usuario.apellido,
      email: usuario.email,
      password: usuario.password
    };

    return this.http.post(URL, json);
  }

}
