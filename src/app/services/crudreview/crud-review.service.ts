import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudReviewService {
  baseUrl: string = `${environment.apiUrl}/Admin`;
  reviewData: any;
  reviewid: any;
  singlereviewdata: any;
  constructor(private http: HttpClient) { }

  //get all reviews  details
  public getreviews(): Observable<any> {
    return this.http.get(this.baseUrl + '/getreviews');
  }

  //get single review
  public getsinglereview(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/getreview/${id}`);
  }

  //add new review    
  public addreview(form: FormData): Observable<any> {
    var json = {
      titulo: form.get('titulo'),
      descripcion: form.get('descripcion'),
      puntuacion: form.get('puntuacion'),
      usuarioIdUsuario: form.get('idUsuario'),
      serieIdSerie: form.get('idSerie'),
    };
    return this.http.post(`${this.baseUrl}/postreview`, json);
  }

  //update review
  public updatereview(form: FormData): Observable<any> {
    var json = {
      idReview: form.get('idReview'),
      titulo: form.get('titulo'),
      descripcion: form.get('descripcion'),
      puntuacion: form.get('puntuacion'),
      fecha: form.get('fecha'),
      usuarioIdUsuario: form.get('idUsuario'),
      serieIdSerie: form.get('idSerie'),
    };
    console.log(json);
    return this.http.put(`${this.baseUrl}/putreview`, json);
  }

  //delete review
  public deletereview(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletereview/${id}`);
  }
}
