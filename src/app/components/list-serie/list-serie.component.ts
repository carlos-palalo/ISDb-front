import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';

@Component({
  selector: 'app-list-serie',
  templateUrl: './list-serie.component.html',
  styleUrls: ['./list-serie.component.css']
})
export class ListSerieComponent implements OnInit {
  public listaSeries: any = [];
  constructor(private RestService: RestService) {

  }

  ngOnInit(): void {
    this.cargarData();
  }

  public cargarData() {
    this.RestService.getSeries()
      .subscribe(respuesta => {
        //console.log(respuesta);
        this.listaSeries = respuesta;
      });
  }
}
