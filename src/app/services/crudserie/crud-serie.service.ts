import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudSerieService {
  baseUrl: string = `${environment.apiUrl}/Admin`;
  constructor(private http: HttpClient) { }

  //get all reviews  details
  public getseries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getseries`);
  }

  //get single review
  public getsingle(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/getserie/${id}`);
  }

  //add new review    
  public add(form: FormData): Observable<any> {
    var json = {
      titulo: form.get('titulo'),
      poster: form.get('poster'),
      year: form.get('year'),
      sinopsis: form.get('sinopsis'),
      trailer: form.get('trailer')
    };
    return this.http.post(`${this.baseUrl}/postserie`, json);
  }

  //update review
  public update(form: FormData): Observable<any> {
    var json = {
      idSerie: form.get('idSerie'),
      titulo: form.get('titulo'),
      poster: form.get('poster'),
      year: form.get('year'),
      sinopsis: form.get('sinopsis'),
      trailer: form.get('trailer'),
    };
    console.log(json);
    return this.http.put(`${this.baseUrl}/putserie`, json);
  }

  //delete review
  public delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteserie/${id}`);
  }
}
