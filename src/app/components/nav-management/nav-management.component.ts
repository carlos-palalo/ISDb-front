import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RestService } from '../../services/rest/rest.service';

@Component({
  selector: 'app-nav-management',
  templateUrl: './nav-management.component.html',
  styleUrls: ['./nav-management.component.css']
})
export class NavManagementComponent implements OnInit {
  public listaSeries: any = [];
  currentUser: User;
  filter_value = '';
  active = 1;
  constructor(
    private RestService: RestService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.cargarData();
  }

  ngOnChange(): void {
    console.log("aaa");
  }

  public cargarData() {
    this.RestService.searchSeries()
      .subscribe(respuesta => {
        //console.log(respuesta);
        this.listaSeries = respuesta;
      });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  get isAdmin(){
    return this.currentUser && this.currentUser.tipo == Role.admin;
  }
}
