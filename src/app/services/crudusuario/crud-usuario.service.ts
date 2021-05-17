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
  public adduser(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/postusuario`, { username, password, email });
  }

  //update user
  public updateuser(form: FormData, userid): Observable<any> {
    var json = {
      IdUsuario: userid,
      Username: form.get('username'),
      Email: form.get('email'),
      Tipo: form.get('tipo')
    };
    console.log(json);
    return this.http.put(`${this.baseUrl}/putusuario/${userid}`, json);
  }

  //delete user
  public deleteuser(userid): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteusuario/${userid}`);
  }
}
