import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CrudSerieGeneroService {
  baseUrl: string = `${environment.apiUrl}/Admin`;
  serieGeneroData: any;
  serieGeneroid: any;
  singleserieGenerodata: any;
  constructor(private http: HttpClient) { }

  //get all serieGeneros  details
  public getseriegeneros(): Observable<any> {
    return this.http.get(this.baseUrl + '/getseriegeneros');
  }

  //get single serieGenero
  public getsingleseriegenero(serie, genero): Observable<any> {
    return this.http.get(`${this.baseUrl}/getseriegenero/${serie}/${genero}`);
  }

  //add new serieGenero    
  public addseriegenero(form: FormData): Observable<any> {
    var json = {
      serieIdSerie: form.get('idSerie'),
      generoIdGenero: form.get('idGenero')
    };
    return this.http.post(`${this.baseUrl}/postseriegenero`, json);
  }

  //update serieGenero
  public updateseriegenero(form: FormData, serie, genero): Observable<any> {
    var json = {
      serieIdSerie: form.get('idSerie'),
      generoIdGenero: form.get('idGenero')
    };
    console.log(json);
    return this.http.put(`${this.baseUrl}/putseriegenero/${serie}/${genero}`, json);
  }

  //delete serieGenero
  public deleteserieGenero(serie, genero): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteseriegenero/${serie}/${genero}`);
  }
}
