import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudRepartoService } from 'src/app/services/crudreparto/crud-reparto.service';
import { CrudSerieService } from 'src/app/services/crudserie/crud-serie.service';
import { CrudSerieRepartoService } from 'src/app/services/crudseriereparto/crud-serie-reparto.service';
import { SwalService } from 'src/app/services/swal/swal.service';
declare let $: any;

@Component({
  selector: 'app-table-serie-reparto',
  templateUrl: './table-serie-reparto.component.html',
  styleUrls: ['./table-serie-reparto.component.css']
})
export class TableSerieRepartoComponent implements OnInit {
  constructor(
    private crudservice: CrudSerieRepartoService,
    private formBuilder: FormBuilder,
    private serieService: CrudSerieService,
    private repartoService: CrudRepartoService,
    private _swal: SwalService
  ) { }
  data = [];
  seriegenerodata: any
  optSeries = [];
  optRepartos = [];
  obj = [];

  ngOnInit() {
    this.optSeries = ["Select a value"];
    this.optRepartos = ["Select a value"];

    //Add form validations
    this.addForm = this.formBuilder.group({
      idSerie: ['', [Validators.required, Validators.pattern("^([0-9])*$")]],
      idReparto: ['', [Validators.required, Validators.pattern("^([0-9])*$")]]
    });

    //Get all genero details  
    this.crudservice.getserierepartos().subscribe((ret: any[]) => {
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

    this.repartoService.getrepartos().subscribe((ret: any[]) => {
      this.obj = ret;
      this.obj.forEach(item => {
        this.optRepartos.push(item.idReparto);
      })
    });


    //Edit form validations
    this.editForm = this.formBuilder.group({
      idSerie: ['', [Validators.required, Validators.pattern("^([0-9])*$")]],
      idReparto: ['', [Validators.required, Validators.pattern("^([0-9])*$")]]
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
      myFormData.append('idReparto', this.addForm.value.idReparto);

      this.crudservice.addseriereparto(myFormData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Serie-Reparto has been added successfully");
            this.recargar();
            $("#addModal").modal("hide");
          },
          error => {
            console.log(error);
            this._swal.error();
            this.recargar();
            $("#addModal").modal("hide");
          });
    }
  }

  addClose() {
    $("#addModal").modal("hide");
  }

  //Add New Genero Function
  addnew() {
    $("#addModal").modal("show");
  }

  //Delete Genero
  delete(serie, reparto) {
    this._swal.areyousure("Serie-Reparto", (confirm) => {
      if (confirm)
        this.crudservice.deleteserieReparto(serie, reparto)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
              this._swal.success("Serie-Reparto has been deleted successfully");
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
      myFormData.append('idReparto', this.editForm.value.idReparto);

      this.crudservice.updateseriereparto(myFormData, this.serieID, this.repartoID)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Serie-Reparto has been updated successfully");
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

  showedit = false;
  editForm: FormGroup;
  serieID: any;
  repartoID: any;
  edit(serie, genero) {
    //user details post request
    this.crudservice.getsingleseriereparto(serie, genero)
      .subscribe(
        data => {
          this.seriegenerodata = data;
          console.log(data);
          setTimeout(() => {
            this.serieID = this.seriegenerodata.serieIdSerie;
            this.repartoID = this.seriegenerodata.repartoIdReparto;
            this.showedit = true;
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
    this.crudservice.getserierepartos().subscribe((ret: any[]) => {
      this.data = ret;

      $('#datatable').DataTable().destroy();
      this.crudservice.getserierepartos().subscribe((ret: any[]) => {
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
