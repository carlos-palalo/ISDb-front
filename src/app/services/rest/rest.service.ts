import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private urlBase: string = "https://api-isdb.azurewebsites.net/";
  private urlAdmin: string = this.urlBase + "Admin/";
  private urlGeneral: string = this.urlBase + "General/";
  private urlLogin: string = this.urlBase + "Login/";

  constructor(
    private http: HttpClient,
  ) { }

  public getSeries() {
    return this.http.get(this.urlGeneral + "getseries");  // GET 
  }

  public getSerie(id: any) {
    return this.http.get(this.urlGeneral + "getserie/"+id);  // GET 
  }
}
