import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CrudReviewService } from 'src/app/services/crudreview/crud-review.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { SwalService } from 'src/app/services/swal/swal.service';
declare let $: any;

@Component({
  selector: 'app-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.css'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers
})
export class ReviewContainerComponent implements OnInit {
  currentUser: User;
  @Input() data: Array<any> = [];
  @Input() serie: string;
  optPuntuaciones = [];

  constructor(
    config: NgbRatingConfig,
    private authenticationService: AuthenticationService,
    private service: RestService,
    private _swal: SwalService,
    private formBuilder: FormBuilder
  ) {
    config.readonly = true;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser);
  }

  ngOnInit(): void {
    this.optPuntuaciones = ["Select a value", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    this.addForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      puntuacion: ['', [Validators.required, Validators.pattern("^(?:[1-9]|0[1-9]|10)$")]]
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
    console.log(this.authenticationService.getDecodedAccessToken(this.currentUser.token).idUsuario);
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
      myFormData.append('idUsuario', this.authenticationService.getDecodedAccessToken(this.currentUser.token).idUsuario);
      myFormData.append('idSerie', this.serie);

      this.service.addreview(myFormData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Review has been added successfully");
            $("#addReview").modal("hide");
            this.ngOnInit();
          },
          error => {
            console.log(error);
            this._swal.error();
            $("#addReview").modal("hide");
            this.ngOnInit();
          });
    }
  }

  addClose() {
    $("#addReview").modal("hide");
  }

  //Add New Review Function
  addReview() {
    $("#addReview").modal("show");
  }
}
