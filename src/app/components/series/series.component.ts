import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  public listaSeries: any = [];
  public infoSerie: any = [];

  constructor(private RestService: RestService) {

  }

  ngOnInit(): void {
    this.cargarData();
  }

  public cargarData() {
    this.RestService.getSeries()
      .subscribe(respuesta => {
        console.log(respuesta);
        this.listaSeries = respuesta;
      });
  }
  public getSerie(data: any) {
    this.RestService.getSerie(data)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.infoSerie = respuesta;
      });
  }
}
