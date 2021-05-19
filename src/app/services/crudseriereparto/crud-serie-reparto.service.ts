import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudSerieRepartoService {
  baseUrl: string = `${environment.apiUrl}/Admin`;
  constructor(private http: HttpClient) { }

  //get all serieReparto details
  public getserierepartos(): Observable<any> {
    return this.http.get(this.baseUrl + '/getserierepartos');
  }

  //get single serieReparto
  public getsingleseriereparto(serie, reparto): Observable<any> {
    return this.http.get(`${this.baseUrl}/getseriereparto/${serie}/${reparto}`);
  }

  //add new serieReparto
  public addseriereparto(form: FormData): Observable<any> {
    var json = {
      serieIdSerie: form.get('idSerie'),
      repartoIdReparto: form.get('idReparto')
    };
    return this.http.post(`${this.baseUrl}/postseriereparto`, json);
  }

  //update serieReparto
  public updateseriereparto(form: FormData, serie, reparto): Observable<any> {
    var json = {
      serieIdSerie: form.get('idSerie'),
      repartoIdReparto: form.get('idReparto')
    };
    console.log(json);
    console.log(json);
    return this.http.put(`${this.baseUrl}/putseriereparto/${serie}/${reparto}`, json);
  }

  //delete serieReparto
  public deleteserieReparto(serie, reparto): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteseriereparto/${serie}/${reparto}`);
  }
}
