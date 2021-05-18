import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/services/swal/swal.service';
import { CrudReviewService } from 'src/app/services/crudreview/crud-review.service';
import { CrudUsuarioService } from 'src/app/services/crudusuario/crud-usuario.service';
import { CrudSerieService } from 'src/app/services/crudserie/crud-serie.service';
declare let $: any;

@Component({
  selector: 'app-table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.css']
})
export class TableReviewComponent implements OnInit {
  constructor(
    private crudservice: CrudReviewService,
    private usuarioService: CrudUsuarioService,
    private serieService: CrudSerieService,
    private formBuilder: FormBuilder,
    private _swal: SwalService
  ) { }
  data = [];
  usuarios = [];
  series = [];
  reviewdata: any

  ngOnInit() {
    //Add form validations
    this.addForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      puntuacion: ['', [Validators.required]],
      idUsuario: ['', [Validators.required]],
      idSerie: ['', [Validators.required]]
    });

    //Get all genero details  
    this.crudservice.getreviews().subscribe((ret: any[]) => {
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

    this.usuarioService.getusers().subscribe((ret: any[]) => {
      this.usuarios = ret;
    });

    this.serieService.getseries().subscribe((ret: any[]) => {
      this.series = ret;
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

      this.crudservice.addreview(myFormData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Review has been added successfully");
            this.recargar();
            $("#addReview").modal("hide");
          },
          error => {
            console.log(error);
            this._swal.error();
            this.recargar();
            $("#addReview").modal("hide");
          });
    }
  }

  addClose() {
    $("#addReview").modal("hide");
  }

  //Add New Review Function
  addnewreview() {
    $("#addReview").modal("show");
  }

  //Delete Review
  deletereview(id) {
    var resp = this._swal.areyousure("Review", (confirm) => {
      if (confirm)
        this.crudservice.deletereview(id)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
              this._swal.success("Review has been deleted successfully");
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

      this.crudservice.updatereview(myFormData)
        .subscribe(
          response => {
            //console.log(response);
            this.submitted = true;
            this._swal.success("Review has been updated successfully");
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

  showeditreview = false;
  editForm: FormGroup;
  reviewID: any;
  editreview(id) {
    //role details post request
    this.crudservice.getsinglereview(id)
      .subscribe(
        data => {
          this.reviewdata = data;
          console.log(data);
          setTimeout(() => {
            this.editForm.controls["nombre"].setValue(this.reviewdata.nombre);
            this.reviewID = this.reviewdata.idReview;
            this.showeditreview = true;
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
    this.crudservice.getreviews().subscribe((ret: any[]) => {
      this.data = ret;

      $('#datatable').DataTable().destroy();
      this.crudservice.getreviews().subscribe((ret: any[]) => {
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
