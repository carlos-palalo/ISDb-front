import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavCrudComponent } from './components/nav-crud/nav-crud.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardSerieComponent } from './components/card-serie/card-serie.component';
import { CardRepartoComponent } from './components/card-reparto/card-reparto.component';
import { ListSerieComponent } from './components/list-serie/list-serie.component';
import { ListRepartoComponent } from './components/list-reparto/list-reparto.component';
import { AppRoutingModule } from './app-routing.module';
import { SerieComponent } from './components/serie/serie.component';
import { BrokenImgDirective } from './directives/broken-img.directive';
import { ModalVideoComponent } from './components/modal-video/modal-video.component';
import { BrokenVideoDirective } from './directives/broken-video.directive';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ManagementComponent } from './components/management/management.component';
import { ManagementAdminComponent } from './components/management-admin/management-admin.component';
import { NavManagementComponent } from './components/nav-management/nav-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableUsuarioComponent } from './components/tables/table-usuario/table-usuario.component';
import { TableReviewComponent } from './components/tables/table-review/table-review.component';
import { TableSerieComponent } from './components/tables/table-serie/table-serie.component';
import { TableRepartoComponent } from './components/tables/table-reparto/table-reparto.component';
import { TableRoleComponent } from './components/tables/table-role/table-role.component';
import { TableGeneroComponent } from './components/tables/table-genero/table-genero.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavCrudComponent,
    CardSerieComponent,
    CardRepartoComponent,
    ListSerieComponent,
    ListRepartoComponent,
    SerieComponent,
    BrokenImgDirective,
    ModalVideoComponent,
    BrokenVideoDirective,
    SearchComponent,
    SearchPipe,
    LoginComponent,
    RegisterComponent,
    ManagementComponent,
    ManagementAdminComponent,
    NavManagementComponent,
    TableUsuarioComponent,
    TableReviewComponent,
    TableSerieComponent,
    TableRepartoComponent,
    TableRoleComponent,
    TableGeneroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
