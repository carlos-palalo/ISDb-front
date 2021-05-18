import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/services/swal/swal.service';
import { CrudReviewService } from 'src/app/services/crudreview/crud-review.service';
import { CrudUsuarioService } from 'src/app/services/crudusuario/crud-usuario.service';
import { CrudSerieService } from 'src/app/services/crudserie/crud-serie.service';
import { DatePipe } from '@angular/common';
declare let $: any;

@Component({
  selector: 'app-table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.css']
})
export class TableReviewComponent implements OnInit {
  currentDate = new Date();

  constructor(
    private crudservice: CrudReviewService,
    private usuarioService: CrudUsuarioService,
    private serieService: CrudSerieService,
    private formBuilder: FormBuilder,
    private _swal: SwalService,
    private datePipe: DatePipe
  ) { }

  data = [];
  usuarios = [];
  series = [];
  reviewdata: any;
  optPuntuaciones = [];
  optUsuarios = [];
  optSeries = [];

  ngOnInit() {
    this.optPuntuaciones = ["Select a value", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    this.optUsuarios = ["Select a value"];
    this.optSeries = ["Select a value"];

    //Add form validations
    this.addForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      puntuacion: ['', [Validators.required, Validators.pattern("^(?:[1-9]|0[1-9]|10)$")]],
      idUsuario: ['', [Validators.required, Validators.pattern("^([0-9])*$")]],
      idSerie: ['', [Validators.required, Validators.pattern("^([0-9])*$")]]
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
      this.usuarios.forEach(item => {
        this.optUsuarios.push(item.idUsuario);
      });
    });

    this.serieService.getseries().subscribe((ret: any[]) => {
      this.series = ret;
      this.series.forEach(item => {
        this.optSeries.push(item.idSerie);
      })
    });

    //Edit form validations
    this.editForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      puntuacion: ['', [Validators.required, Validators.pattern("^(?:[1-9]|0[1-9]|10)$")]],
      fecha: [new Date(), [Validators.required]],
      idUsuario: ['', [Validators.required, Validators.pattern("^([0-9])*$")]],
      idSerie: ['', [Validators.required, Validators.pattern("^([0-9])*$")]],
    });
  }

  //Add Form
  addForm: FormGroup;
  submitted = false;

  get f() { return this.addForm.controls; }

  onSubmit() {
    console.log(this.addForm.value.puntuacion);
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }

    if (this.submitted) {
      // Initialize Params Object
      var myFormData = new FormData();
      // Begin assigning parameters
      myFormData.append('titulo', this.addForm.value.titulo);
      myFormData.append('descripcion', this.addForm.value.descripcion);
      myFormData.append('puntuacion', this.addForm.value.puntuacion);
      myFormData.append('idUsuario', this.addForm.value.idUsuario);
      myFormData.append('idSerie', this.addForm.value.idSerie);

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
    //console.log(this.editForm);
    this.submitted = true;
    this.editForm.value.fecha = this.datePipe.transform(this.editForm.value.fecha, 'yyyy-MM-dd');
    console.log(this.editForm.value.fecha);

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
      myFormData.append('idReview', this.reviewID);
      myFormData.append('titulo', this.editForm.value.titulo);
      myFormData.append('descripcion', this.editForm.value.descripcion);
      myFormData.append('puntuacion', this.editForm.value.puntuacion);
      myFormData.append('fecha', this.editForm.value.fecha);
      myFormData.append('idUsuario', this.editForm.value.idUsuario);
      myFormData.append('idSerie', this.editForm.value.idSerie);


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
    //console.log(this.puntuacion.value);
    this.crudservice.getsinglereview(id)
      .subscribe(
        data => {
          this.reviewdata = data;
          console.log(data);
          setTimeout(() => {
            this.editForm.controls["titulo"].setValue(this.reviewdata.titulo);
            this.editForm.controls["descripcion"].setValue(this.reviewdata.descripcion);
            this.editForm.controls["fecha"].setValue(this.reviewdata.fecha);
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
