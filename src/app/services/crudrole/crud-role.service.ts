import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudRoleService {
  baseUrl: string = `${environment.apiUrl}/Admin`;
  generoData: any;
  generoid: any;
  singlegenerodata: any;
  constructor(private http: HttpClient) { }

  //get all generos  details
  public getroles(): Observable<any> {
    return this.http.get(this.baseUrl + '/getroles');
  }

  //get single genero
  public getsinglerole(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/getrole/${id}`);
  }

  //add new genero    
  public addrole(form: FormData): Observable<any> {
    var json = {
      Nombre: form.get('nombre')
    };
    return this.http.post(`${this.baseUrl}/postrole`, json);
  }

  //update genero
  public updaterole(form: FormData, id: Number): Observable<any> {
    var json = {
      IdRole: id,
      Nombre: form.get('nombre')
    };
    console.log(json);
    return this.http.put(`${this.baseUrl}/putrole`, json);
  }

  //delete genero
  public deleterole(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleterole/${id}`);
  }
}
