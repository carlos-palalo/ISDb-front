import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudRepartoRoleService {
  baseUrl: string = `${environment.apiUrl}/Admin`;
  constructor(private http: HttpClient) { }

  //get all serieReparto details
  public get(): Observable<any> {
    return this.http.get(this.baseUrl + '/getrepartoroles');
  }

  //get single serieReparto
  public getsingle(reparto, role): Observable<any> {
    return this.http.get(`${this.baseUrl}/getrepartorole/${reparto}/${role}`);
  }

  //add new serieReparto
  public add(form: FormData): Observable<any> {
    var json = {
      repartoIdReparto: form.get('idReparto'),
      roleIdRole: form.get('idRole')
    };
    return this.http.post(`${this.baseUrl}/postrepartorole`, json);
  }

  //update serieReparto
  public update(form: FormData, reparto, role): Observable<any> {
    var json = {
      repartoIdReparto: form.get('idReparto'),
      roleIdRole: form.get('idRole')
    };
    //console.log(json);
    return this.http.put(`${this.baseUrl}/putrepartorole/${reparto}/${role}`, json);
  }

  //delete serieReparto
  public delete(reparto, role): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleterepartorole/${reparto}/${role}`);
  }
}
