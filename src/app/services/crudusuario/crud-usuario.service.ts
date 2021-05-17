import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudUsuarioService {
  baseUrl: string = `${environment.apiUrl}/Admin`;
  userData: any;
  userid: any;
  singleuserdata: any;
  constructor(private http: HttpClient) { }

  //get all users  details
  public getusers(): Observable<any> {
    return this.http.get(this.baseUrl + '/getusuarios');
  }

  //get single user
  public getsingleuser(userid): Observable<any> {
    return this.http.get(`${this.baseUrl}/getusuario/${userid}`);
  }

  //add new user    
  public adduser(form: FormData): Observable<any> {
    var json = {
      username: form.get('username'),
      password: form.get('password'),
      email: form.get('email')
    };
    return this.http.post(`${this.baseUrl}/postusuario`, json);
  }

  //update user
  public updateuser(form: FormData, id: Number): Observable<any> {
    var json = {
      IdUsuario: id,
      Username: form.get('username'),
      Email: form.get('email'),
      Tipo: form.get('tipo')
    };
    console.log(json);
    return this.http.put(`${this.baseUrl}/putusuario`, json);
  }

  //delete user
  public deleteuser(userid): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteusuario/${userid}`);
  }
}
