import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudRepartoService } from 'src/app/services/crudreparto/crud-reparto.service';
import { CrudRepartoRoleService } from 'src/app/services/crudrepartorole/crud-reparto-role.service';
import { CrudRoleService } from 'src/app/services/crudrole/crud-role.service';
import { SwalService } from 'src/app/services/swal/swal.service';
declare let $: any;

@Component({
  selector: 'app-table-reparto-role',
  templateUrl: './table-reparto-role.component.html',
  styleUrls: ['./table-reparto-role.component.css']
})
export class TableRepartoRoleComponent implements OnInit {
  constructor(
    private crudservice: CrudRepartoRoleService,
    private formBuilder: FormBuilder,
    private roleService: CrudRoleService,
    private repartoService: CrudRepartoService,
    private _swal: SwalService
  ) { }
  data = [];
  seriegenerodata: any
  optRoles = [];
  optRepartos = [];
  obj = [];

  ngOnInit() {
    this.optRoles = ["Select a value"];
    this.optRepartos = ["Select a value"];

    //Add form validations
    this.addForm = this.formBuilder.group({
      idReparto: ['', [Validators.required, Validators.pattern("^([0-9])*$")]],
      idRole: ['', [Validators.required, Validators.pattern("^([0-9])*$")]]
    });

    //Get all genero details  
    this.crudservice.get().subscribe((ret: any[]) => {
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

    this.repartoService.getrepartos().subscribe((ret: any[]) => {
      this.obj = ret;
      this.obj.forEach(item => {
        this.optRepartos.push(item.idReparto);
      })
    });

    this.roleService.getroles().subscribe((ret: any[]) => {
      this.obj = ret;
      this.obj.forEach(item => {
        this.optRoles.push(item.idRole);
      })
    });


    //Edit form validations
    this.editForm = this.formBuilder.group({
      idReparto: ['', [Validators.required, Validators.pattern("^([0-9])*$")]],
      idRole: ['', [Validators.required, Validators.pattern("^([0-9])*$")]]
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
      myFormData.append('idReparto', this.addForm.value.idReparto);
      myFormData.append('idRole', this.addForm.value.idRole);

      this.crudservice.add(myFormData)
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
  delete(reparto, role) {
    this._swal.areyousure("Reparto-Role", (confirm) => {
      if (confirm)
        this.crudservice.delete(reparto, role)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
              this._swal.success("Reparto-Role has been deleted successfully");
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
      myFormData.append('idReparto', this.editForm.value.idReparto);
      myFormData.append('idRole', this.editForm.value.idRole);

      this.crudservice.update(myFormData, this.repartoID, this.roleID)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this._swal.success("Reparto-Role has been updated successfully");
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
  roleID: any;
  repartoID: any;
  edit(reparto, role) {
    //user details post request
    this.crudservice.getsingle(reparto, role)
      .subscribe(
        data => {
          this.seriegenerodata = data;
          console.log(data);
          setTimeout(() => {
            this.repartoID = this.seriegenerodata.repartoIdReparto;
            this.roleID = this.seriegenerodata.roleIdRole;
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
    this.crudservice.get().subscribe((ret: any[]) => {
      this.data = ret;

      $('#datatable').DataTable().destroy();
      this.crudservice.get().subscribe((ret: any[]) => {
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
