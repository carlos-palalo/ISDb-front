import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavCrudComponent } from './components/nav-crud/nav-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { CardSerieComponent } from './components/card-serie/card-serie.component';
import { CardRepartoComponent } from './components/card-reparto/card-reparto.component';
import { ListSerieComponent } from './components/list-serie/list-serie.component';
import { ListRepartoComponent } from './components/list-reparto/list-reparto.component';
import { AppRoutingModule } from './app-routing.module';
import { SerieComponent } from './components/serie/serie.component';

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
    SerieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
