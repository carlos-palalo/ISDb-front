import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavCrudComponent } from './components/nav-crud/nav-crud.component';
import { SeriesComponent } from './components/series/series.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { CardSerieComponent } from './components/card-serie/card-serie.component';
import { CardRepartoComponent } from './components/card-reparto/card-reparto.component';
import { ListSerieComponent } from './components/list-serie/list-serie.component';
import { ListRepartoComponent } from './components/list-reparto/list-reparto.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavCrudComponent,
    SeriesComponent,
    MainComponent,
    CardSerieComponent,
    CardRepartoComponent,
    ListSerieComponent,
    ListRepartoComponent
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
