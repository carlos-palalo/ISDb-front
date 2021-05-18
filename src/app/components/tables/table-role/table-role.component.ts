import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/services/swal/swal.service';
import { CrudRoleService } from 'src/app/services/crudrole/crud-role.service';
declare let $: any;

@Component({
  selector: 'app-table-role',
  templateUrl: './table-role.component.html',
  styleUrls: ['./table-role.component.css']
})

export class TableRoleComponent implements OnInit {
  constructor(
    private crudservice: CrudRoleService,
    private formBuilder: FormBuilder,
    private _swal: SwalService
  ) { }
  data = [];
  roledata: any

  ngOnInit() {
    //Add form validations
    this.addForm = this.formBuilder.group({
      nombre: ['', [Validators.required]]
    });

    //Get all genero details  
    this.crudservice.getroles().subscribe((ret: any[]) => {
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

      this.crudservice.addrole(myFormData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Role has been added successfully");
            this.recargar();
            $("#addRole").modal("hide");
          },
          error => {
            console.log(error);
            this._swal.error();
            this.recargar();
            $("#addRole").modal("hide");
          });
    }
  }

  addClose() {
    $("#addRole").modal("hide");
  }

  //Add New Role Function
  addnewrole() {
    $("#addRole").modal("show");
  }

  //Delete Role
  deleterole(id) {
    var resp = this._swal.areyousure("Role", (confirm) => {
      if (confirm)
        this.crudservice.deleterole(id)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
              this._swal.success("Role has been deleted successfully");
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

      this.crudservice.updaterole(myFormData, this.roleID)
        .subscribe(
          response => {
            //console.log(response);
            this.submitted = true;
            this._swal.success("Role has been updated successfully");
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

  showeditrole = false;
  editForm: FormGroup;
  roleID: any;
  editrole(id) {
    //role details post request
    this.crudservice.getsinglerole(id)
      .subscribe(
        data => {
          this.roledata = data;
          console.log(data);
          setTimeout(() => {
            this.editForm.controls["nombre"].setValue(this.roledata.nombre);
            this.roleID = this.roledata.idGenero;
            this.showeditrole = true;
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
    this.crudservice.getroles().subscribe((ret: any[]) => {
      this.data = ret;

      $('#datatable').DataTable().destroy();
      this.crudservice.getroles().subscribe((ret: any[]) => {
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
