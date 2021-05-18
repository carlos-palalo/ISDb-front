import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudGeneroService } from 'src/app/services/crudgenero/crud-genero.service';
import { CrudSerieService } from 'src/app/services/crudserie/crud-serie.service';
import { CrudSerieGeneroService } from 'src/app/services/crudseriegenero/crud-serie-genero.service';
import { SwalService } from 'src/app/services/swal/swal.service';
declare let $: any;

@Component({
  selector: 'app-table-serie-genero',
  templateUrl: './table-serie-genero.component.html',
  styleUrls: ['./table-serie-genero.component.css']
})
export class TableSerieGeneroComponent implements OnInit {
  constructor(
    private crudservice: CrudSerieGeneroService,
    private formBuilder: FormBuilder,
    private serieService: CrudSerieService,
    private generoService: CrudGeneroService,
    private _swal: SwalService
  ) { }
  data = [];
  seriegenerodata: any
  optSeries = [];
  optGeneros = [];
  obj = [];

  ngOnInit() {
    this.optSeries = ["Select a value"];
    this.optGeneros = ["Select a value"];

    //Add form validations
    this.addForm = this.formBuilder.group({
      idSerie: ['', [Validators.required, Validators.pattern("^([0-9])*$")]],
      idGenero: ['', [Validators.required, Validators.pattern("^([0-9])*$")]]
    });

    //Get all genero details  
    this.crudservice.getseriegeneros().subscribe((ret: any[]) => {
      this.data = ret;
      //console.log(this.data);
      setTimeout(() => {
        $('#datatable').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
          order: [0, "asc"]
        });
      }, 100);
    });

    this.serieService.getseries().subscribe((ret: any[]) => {
      this.obj = ret;
      this.obj.forEach(item => {
        this.optSeries.push(item.idSerie);
      })
    });

    this.generoService.getgeneros().subscribe((ret: any[]) => {
      this.obj = ret;
      this.obj.forEach(item => {
        this.optGeneros.push(item.idGenero);
      })
    });


    //Edit form validations
    this.editForm = this.formBuilder.group({
      idSerie: ['', [Validators.required, Validators.pattern("^([0-9])*$")]],
      idGenero: ['', [Validators.required, Validators.pattern("^([0-9])*$")]]
    });
  }

  //Add Form
  addForm: FormGroup;
  submitted = false;

  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }

    if (this.submitted) {
      // Initialize Params Object
      var myFormData = new FormData();
      // Begin assigning parameters
      myFormData.append('idSerie', this.addForm.value.idSerie);
      myFormData.append('idGenero', this.addForm.value.idGenero);

      this.crudservice.addseriegenero(myFormData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Serie-Genero has been added successfully");
            this.recargar();
            $("#addGenero").modal("hide");
          },
          error => {
            console.log(error);
            this._swal.error();
            this.recargar();
            $("#addGenero").modal("hide");
          });
    }
  }

  addClose() {
    $("#addSerieGenero").modal("hide");
  }

  //Add New Genero Function
  addnewseriegenero() {
    $("#addSerieGenero").modal("show");
  }

  //Delete Genero
  deleteseriegenero(serie, genero) {
    var resp = this._swal.areyousure("Serie-Genero", (confirm) => {
      if (confirm)
        this.crudservice.deleteserieGenero(serie, genero)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
              this._swal.success("Serie-Genero has been deleted successfully");
              this.recargar();
            },
            error => {
              console.log(error);
              this._swal.error();
              this.recargar();
            });
    });
  }

  //Edit User code starts
  get fe() { return this.editForm.controls; }
  onSubmitEdit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.editForm.invalid) {
      console.log("Invalid");
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      // Initialize Params Object
      var myFormData = new FormData();

      // Begin assigning parameters
      myFormData.append('idSerie', this.editForm.value.idSerie);
      myFormData.append('idGenero', this.editForm.value.idGenero);

      this.crudservice.updateseriegenero(myFormData, this.serieID, this.generoID)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Serie-Genero has been updated successfully");
            this.recargar();
            $("#editModal").modal("hide");
          },
          error => {
            console.log("error");
            this._swal.error();
            this.recargar();
            $("#editModal").modal("hide");
          });;
    }
  }

  showeditseriegenero = false;
  editForm: FormGroup;
  serieID: any;
  generoID: any;
  editseriegenero(serie, genero) {
    //user details post request
    this.crudservice.getsingleseriegenero(serie, genero)
      .subscribe(
        data => {
          this.seriegenerodata = data;
          console.log(data);
          setTimeout(() => {
            this.serieID = this.seriegenerodata.serieIdSerie;
            this.generoID = this.seriegenerodata.generoIdGenero;
            this.showeditseriegenero = true;
            $("#editModal").modal("show");
          }, 500);
        },
        error => {
          console.log(error);
        });;
  }

  editClose() {
    $("#editModal").modal("hide");
  }

  recargar() {
    this.crudservice.getseriegeneros().subscribe((ret: any[]) => {
      this.data = ret;

      $('#datatable').DataTable().destroy();
      this.crudservice.getseriegeneros().subscribe((ret: any[]) => {
        this.data = ret;
        //console.log(this.data);
        setTimeout(() => {
          $('#datatable').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25],
            order: [0, "asc"]
          });
        }, 500);
      });
    });
  }
}
