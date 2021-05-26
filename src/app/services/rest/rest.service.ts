import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl: string = `${environment.apiUrl}/General/`;

  constructor(
    private http: HttpClient,
  ) { }

  public getSeries() {
    return this.http.get(this.baseUrl + "getseries");  // GET 
  }

  public getSerie(id: any) {
    return this.http.get(this.baseUrl + "getserie/" + id);  // GET 
  }

  public searchSeries() {
    return this.http.get(this.baseUrl + "searchserie");  // GET
  }

  public addreview(form: FormData): Observable<any> {
    var json = {
      titulo: form.get('titulo'),
      descripcion: form.get('descripcion'),
      puntuacion: form.get('puntuacion'),
      usuarioIdUsuario: form.get('idUsuario'),
      serieIdSerie: form.get('idSerie'),
    };
    return this.http.post(`${this.baseUrl}postreview`, json);
  }

  public generateBBDD(){
    return this.http.get(`${this.baseUrl}generatebbdd`);
  }
}
