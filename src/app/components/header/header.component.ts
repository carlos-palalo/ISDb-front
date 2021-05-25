import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { filter } from 'rxjs/operators';
import { SearchComponent } from '../search/search.component';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public listaSeries: any = [];
  token: any;
  filter_value = '';

  constructor(
    private RestService: RestService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => { this.token = authenticationService.getDecodedAccessToken(x) });
  }

  @ViewChild(SearchComponent)
  private resetValue: SearchComponent;

  ngOnInit(): void {
    this.cargarData();
  }

  public cargarData() {
    this.RestService.searchSeries()
      .subscribe(respuesta => {
        //console.log(respuesta);
        this.listaSeries = respuesta;
      });
  }

  public handleSearch(value: string) {
    //console.log(value);
    this.filter_value = value;
  }

  public resetSearch() {
    this.resetValue.search.setValue("");
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  get isAdmin() {
    //console.log(this.token);
    return this.token && this.token.role == Role.admin;
  }

  get isInfo() {
    //console.log(this.router.url);
    return this.router.url === '/myinfo';
  }
}
