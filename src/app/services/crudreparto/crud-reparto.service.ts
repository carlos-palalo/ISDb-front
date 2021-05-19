import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudRepartoService {
  baseUrl: string = `${environment.apiUrl}/Admin`;
  constructor(private http: HttpClient) { }

  //get all series  details
  public getrepartos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getrepartosall`);
  }

  //get all repartos from one serie  details
  public getinforepartos(serie): Observable<any> {
    return this.http.get(`${this.baseUrl}/getrepartos/${serie}`);
  }

  //get single genero
  public getsingle(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/getreparto/${id}`);
  }

  //add new genero    
  public add(form: FormData): Observable<any> {
    var json = {
      name: form.get('nombre'),
      foto: form.get('foto')
    };
    return this.http.post(`${this.baseUrl}/postreparto`, json);
  }

  //update genero
  public update(form: FormData, id: Number): Observable<any> {
    var json = {
      idReparto: id,
      name: form.get('nombre'),
      foto: form.get('foto')
    };
    console.log(json);
    return this.http.put(`${this.baseUrl}/putreparto`, json);
  }

  //delete genero
  public delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletereparto/${id}`);
  }
}
