import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/services/swal/swal.service';
import { CrudReviewService } from 'src/app/services/crudreview/crud-review.service';
import { CrudUsuarioService } from 'src/app/services/crudusuario/crud-usuario.service';
import { CrudSerieService } from 'src/app/services/crudserie/crud-serie.service';
import { DatePipe } from '@angular/common';
declare let $: any;

@Component({
  selector: 'app-table-serie',
  templateUrl: './table-serie.component.html',
  styleUrls: ['./table-serie.component.css']
})
export class TableSerieComponent implements OnInit {
  currentDate = new Date();

  constructor(
    private crudservice: CrudSerieService,
    private formBuilder: FormBuilder,
    private _swal: SwalService,
    private datePipe: DatePipe
  ) { }

  data = [];
  usuarios = [];
  series = [];
  seriedata: any;

  ngOnInit() {
    //Add form validations
    this.addForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      poster: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.pattern("^(19|20)\\d{2}$")]],
      sinopsis: ['', [Validators.required]],
      trailer: ['', [Validators.required]]
    });

    //Get all genero details  
    this.crudservice.getseries().subscribe((ret: any[]) => {
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
      titulo: ['', [Validators.required]],
      poster: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.pattern("^(19|20)\\d{2}$")]],
      sinopsis: ['', [Validators.required]],
      trailer: ['', [Validators.required]]
    });
  }

  //Generate BBDD
  generateBBDD(){
    
  }

  //Add Form
  addForm: FormGroup;
  submitted = false;

  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.addForm.value.year);
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }

    if (this.submitted) {
      // Initialize Params Object
      var myFormData = new FormData();
      // Begin assigning parameters
      myFormData.append('titulo', this.addForm.value.titulo);
      myFormData.append('poster', this.addForm.value.poster);
      myFormData.append('year', this.addForm.value.year);
      myFormData.append('sinopsis', this.addForm.value.sinopsis);
      myFormData.append('trailer', this.addForm.value.trailer);

      this.crudservice.add(myFormData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Serie has been added successfully");
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

  //Add New Review Function
  addnew() {
    $("#addModal").modal("show");
  }

  //Delete Review
  deleteserie(id) {
    var resp = this._swal.areyousure("Serie", (confirm) => {
      if (confirm)
        this.crudservice.delete(id)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
              this._swal.success("Serie has been deleted successfully");
              this.recargar();
            },
            error => {
              console.log(error);
              this._swal.error();
              this.recargar();
            });
    });
  }

  //Edit Role code starts
  get fe() { return this.editForm.controls; }
  onSubmitEdit() {
    //console.log(this.editForm);
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
      myFormData.append('idSerie', this.serieID);
      myFormData.append('titulo', this.editForm.value.titulo);
      myFormData.append('poster', this.editForm.value.poster);
      myFormData.append('year', this.editForm.value.year);
      myFormData.append('sinopsis', this.editForm.value.sinopsis);
      myFormData.append('trailer', this.editForm.value.trailer);

      console.log(myFormData);
      this.crudservice.update(myFormData)
        .subscribe(
          response => {
            //console.log(response);
            this.submitted = true;
            this._swal.success("Serie has been updated successfully");
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
  edit(id) {
    //role details post request
    //console.log(this.puntuacion.value);
    this.crudservice.getsingle(id)
      .subscribe(
        data => {
          this.seriedata = data;
          console.log(data);
          setTimeout(() => {
            this.editForm.controls["titulo"].setValue(this.seriedata.titulo);
            this.editForm.controls["poster"].setValue(this.seriedata.poster);
            this.editForm.controls["year"].setValue(this.seriedata.year);
            this.editForm.controls["sinopsis"].setValue(this.seriedata.sinopsis);
            this.editForm.controls["trailer"].setValue(this.seriedata.trailer);
            this.serieID = this.seriedata.idSerie;
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
    this.crudservice.getseries().subscribe((ret: any[]) => {
      this.data = ret;

      $('#datatable').DataTable().destroy();
      this.crudservice.getseries().subscribe((ret: any[]) => {
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
