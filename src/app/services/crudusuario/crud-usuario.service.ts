import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudUsuarioService {
  baseUrl: string = `${environment.apiUrl}/Admin`;
  userData: any;
  userid: any;
  singleuserdata: any;
  constructor(private http: HttpClient) { }

  //get all users  details
  public getusers() {
    return this.http.get(this.baseUrl + '/getusuarios');
  }

  //get single user
  public getsingleuser(userid) {
    return this.http.get(this.baseUrl + '/getusuario/' + userid)
      .subscribe((res: Response) => {
        this.singleuserdata = res[0];
      });
  }

  //add new user    
  public adduser(username, pass, email) {
    //return this.http.post<any>(`${environment.apiUrl}/Login/register`, { Username, Password, Email });
    //return this.http.post<any>(this.baseUrl + '/postusuario', {username, pass, email}).subscribe((res: Response) => { });
    return this.http.post<any>(this.baseUrl + '/postusuario', { username, pass, email })
      .pipe(map(usuario => { return usuario; }));
  }

  //update user
  public updateuser(userid) {
  return this.http.put(this.baseUrl + '/putusuario'
    , userid).subscribe((res: Response) => { });
}

  //delete user
  public deleteuser(userid) {
  return this.http.delete(this.baseUrl + '/deleteusuario' + userid).subscribe((res: Response) => { });
}
}
