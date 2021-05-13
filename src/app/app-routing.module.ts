import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSerieComponent } from './components/list-serie/list-serie.component';
import { SerieComponent } from './components/serie/serie.component';

const routes: Routes = [
  { path: '', component: ListSerieComponent  },
  { path: 'serie/:variable', component: SerieComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }