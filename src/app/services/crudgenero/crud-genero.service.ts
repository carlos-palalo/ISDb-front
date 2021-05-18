import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudGeneroService {
  baseUrl: string = `${environment.apiUrl}/Admin`;
  generoData: any;
  generoid: any;
  singlegenerodata: any;
  constructor(private http: HttpClient) { }

  //get all generos  details
  public getgeneros(): Observable<any> {
    return this.http.get(this.baseUrl + '/getgeneros');
  }

  //get single genero
  public getsinglegenero(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/getgenero/${id}`);
  }

  //add new genero    
  public addgenero(form: FormData): Observable<any> {
    var json = {
      Nombre: form.get('nombre')
    };
    return this.http.post(`${this.baseUrl}/postgenero`, json);
  }

  //update genero
  public updategenero(form: FormData, id: Number): Observable<any> {
    var json = {
      IdGenero: id,
      Nombre: form.get('nombre')
    };
    console.log(json);
    return this.http.put(`${this.baseUrl}/putgenero`, json);
  }

  //delete genero
  public deletegenero(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletegenero/${id}`);
  }
}
