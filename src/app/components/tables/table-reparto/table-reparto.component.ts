import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudRepartoService } from 'src/app/services/crudreparto/crud-reparto.service';
import { SwalService } from 'src/app/services/swal/swal.service';
declare let $: any;

@Component({
  selector: 'app-table-reparto',
  templateUrl: './table-reparto.component.html',
  styleUrls: ['./table-reparto.component.css']
})
export class TableRepartoComponent implements OnInit {
  constructor(
    private crudservice: CrudRepartoService,
    private formBuilder: FormBuilder,
    private _swal: SwalService
  ) { }
  data = [];
  repartodata: any
  idSearch: any;

  ngOnInit() {
    //Add form validations
    this.addForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      foto: ['']
    });

    this.serieForm = this.formBuilder.group({
        idSerie: ['', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]]
    });

    this.serieForm.controls["idSerie"].setValue("1");
    this.idSearch = this.serieForm.value.idSerie;

    //Get all genero details  
    this.crudservice.getinforepartos(this.idSearch).subscribe((ret: any[]) => {
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
      nombre: ['', [Validators.required]],
      foto: ['']
    });
  }

  //Serie Form
  serieForm: FormGroup;
  submittedSerie = false;
  get s() { return this.serieForm.controls; }
  
  onSearchSerie() {
    this.submittedSerie=true;
    //console.log(this.serieForm.value.idSerie);
    
    if(this.serieForm.invalid){
      return;
    }

    if(this.submittedSerie){
      this.idSearch = this.serieForm.value.idSerie;
      this.recargar(this.idSearch);
    }
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
      myFormData.append('foto', this.addForm.value.foto);

      this.crudservice.add(myFormData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Reparto has been added successfully");
            this.recargar(this.idSearch);
            $("#addModal").modal("hide");
          },
          error => {
            console.log(error);
            this._swal.error();
            this.recargar(this.idSearch);
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
  deletereparto(id) {
    var resp = this._swal.areyousure("Reparto", (confirm) => {
      if (confirm)
        this.crudservice.delete(id)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
              this._swal.success("Reparto has been deleted successfully");
              this.recargar(this.idSearch);
            },
            error => {
              console.log(error);
              this._swal.error();
              this.recargar(this.idSearch);
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
      myFormData.append('foto', this.editForm.value.foto);

      this.crudservice.update(myFormData, this.repartoID)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Reparto has been updated successfully");
            this.recargar(this.idSearch);
            $("#editModal").modal("hide");
          },
          error => {
            console.log("error");
            this._swal.error();
            this.recargar(this.idSearch);
            $("#editModal").modal("hide");
          });;
    }
  }

  showedit = false;
  editForm: FormGroup;
  repartoID: any;
  edit(id) {
    //user details post request
    this.crudservice.getsingle(id)
      .subscribe(
        data => {
          this.repartodata = data;
          console.log(data);
          setTimeout(() => {
            this.editForm.controls["nombre"].setValue(this.repartodata.name);
            this.editForm.controls["foto"].setValue(this.repartodata.foto);
            this.repartoID = this.repartodata.idReparto;
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

  recargar(id) {
    this.crudservice.getinforepartos(id).subscribe((ret: any[]) => {
      this.data = ret;

      $('#datatable').DataTable().destroy();
      this.crudservice.getinforepartos(id).subscribe((ret: any[]) => {
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
