import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../services/rest/rest.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css'],
})
export class SerieComponent implements OnInit {
  public respuesta: any = [];
  public listDirector: Array<any> = [];
  public listWriter: Array<any> = [];
  public listActor: Array<any> = [];
  public listReview: Array<any> = [];

  constructor(private route: ActivatedRoute, private RestService: RestService) { }

  @ViewChild(HeaderComponent)
  private resetHeader: HeaderComponent;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap
      //console.log(params.variable);
      this.cargarData(params.variable);
    })
  }

  public cargarData(id: string) {
    this.RestService.getSerie(id)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.respuesta = respuesta;
        this.cargarListas();
      });
  }


  public cargarListas() {
    this.respuesta.listaReparto.forEach(element => {
      switch (element.role) {
        case "director":
          this.listDirector.push(element);
          break;
        case "writer":
          this.listWriter.push(element);
          break;
        case "actor":
          this.listActor.push(element);
          break;
      }
    });
    this.listReview = this.respuesta.listaReview;
    this.resetHeader.filter_value="";
    this.resetHeader.resetSearch();
  }
}
