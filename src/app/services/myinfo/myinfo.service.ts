import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MyinfoService {
  baseUrl: string = `${environment.apiUrl}/General`;

  constructor(private http: HttpClient) { }

  public updateinfo(form: FormData): Observable<any> {
    var json = {
      idUsuario: form.get('idUsuario'),
      username: form.get('username'),
      email: form.get('email')
    };
    console.log(json);
    return this.http.put(`${this.baseUrl}/updateinfo`, json);
  }

  public updatepass(form: FormData): Observable<any> {
    var json = {
      idUser: form.get('idUsuario'),
      password: form.get('password'),
    };
    console.log(json);
    return this.http.put(`${this.baseUrl}/updatepass`, json);
  }

  public getusuario(user){
    return this.http.get(`${this.baseUrl}/getusuario/${user}`);
  }
}
