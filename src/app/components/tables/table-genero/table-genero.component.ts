import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudGeneroService } from 'src/app/services/crudgenero/crud-genero.service';
import { SwalService } from 'src/app/services/swal/swal.service';
declare let $: any;
@Component({
  selector: 'app-table-genero',
  templateUrl: './table-genero.component.html',
  styleUrls: ['./table-genero.component.css']
})
export class TableGeneroComponent implements OnInit {
  constructor(
    private crudservice: CrudGeneroService,
    private formBuilder: FormBuilder,
    private _swal: SwalService
  ) { }
  data = [];
  generodata: any

  ngOnInit() {
    //Add form validations
    this.addForm = this.formBuilder.group({
      nombre: ['', [Validators.required]]
    });

    //Get all genero details  
    this.crudservice.getgeneros().subscribe((ret: any[]) => {
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

    //Edit form validations
    this.editForm = this.formBuilder.group({
      nombre: ['', [Validators.required]]
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
      myFormData.append('nombre', this.addForm.value.nombre);

      this.crudservice.addgenero(myFormData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Genero has been added successfully");
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
    $("#addGenero").modal("hide");
  }

  //Add New Genero Function
  addnewgenero() {
    $("#addGenero").modal("show");
  }

  //Delete Genero
  deletegenero(id) {
    var resp = this._swal.areyousure("Genero", (confirm) => {
      if (confirm)
        this.crudservice.deletegenero(id)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
              this._swal.success("Genero has been deleted successfully");
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
      myFormData.append('nombre', this.editForm.value.nombre);

      this.crudservice.updategenero(myFormData, this.generoID)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Genero has been updated successfully");
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

  showeditgenero = false;
  editForm: FormGroup;
  generoID: any;
  editgenero(id) {
    //user details post request
    this.crudservice.getsinglegenero(id)
      .subscribe(
        data => {
          this.generodata = data;
          console.log(data);
          setTimeout(() => {
            this.editForm.controls["nombre"].setValue(this.generodata.nombre);
            this.generoID = this.generodata.idGenero;
            this.showeditgenero = true;
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
    this.crudservice.getgeneros().subscribe((ret: any[]) => {
      this.data = ret;

      $('#datatable').DataTable().destroy();
      this.crudservice.getgeneros().subscribe((ret: any[]) => {
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
