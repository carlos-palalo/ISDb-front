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

  //get all series  details
  public getseries(): Observable<any> {
    return this.http.get(this.baseUrl + '/getseries');
  }
}
