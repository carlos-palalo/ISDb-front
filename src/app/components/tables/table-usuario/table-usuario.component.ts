import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudUsuarioService } from 'src/app/services/crudusuario/crud-usuario.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare let $: any;

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
  styleUrls: ['./table-usuario.component.css']
})

export class TableUsuarioComponent implements OnInit {
  constructor(private crudservice: CrudUsuarioService, private formBuilder: FormBuilder) { }
  data = [];
  userdata: any

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

      myFormData.append('Username', this.addForm.value.username);
      myFormData.append('Password', this.addForm.value.pass);
      myFormData.append('Email', this.addForm.value.email);
      this.crudservice.adduser(this.addForm.value.username, this.addForm.value.pass, this.addForm.value.email)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
          },
          error => {
            console.log(error);
          });

      this.crudservice.getusers().subscribe((ret: any[]) => {
        this.data = ret;
        $("#addUser").modal("hide");
        //sweetalert message popup
        Swal.fire({
          title: 'Hurray!!',
          text: "User has been added successfully",
          icon: 'success'
        });

        $('#datatableexample').DataTable().destroy();
        this.crudservice.getusers().subscribe((ret: any[]) => {

          this.data = ret;
          //console.log(this.data);
          setTimeout(() => {
            $('#datatableexample').DataTable({
              pagingType: 'full_numbers',
              pageLength: 5,
              processing: true,
              lengthMenu: [5, 10, 25],
              order: [0, "desc"]
            });
          }, 500);


        });
      });
    }
  }

  ngOnInit() {
    //Add form validations
    this.addForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      pass: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
    });

    //Get all user details  
    this.crudservice.getusers().subscribe((ret: any[]) => {
      this.data = ret;
      //console.log(this.data);
      setTimeout(() => {
        $('#datatableexample').DataTable({
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
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      tipo: ['', [Validators.required]]
    });

  }
  //Add New User Function
  addnewuser() {
    $("#addUser").modal("show");
  }
  //View User

  //Delete User
  deleteuser(id) {
    // Initialize Params Object
    var myFormData = new FormData();

    // Begin assigning parameters
    myFormData.append('deleteid', id);
    console.log(id);
    this.crudservice.deleteuser(id)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log("error");
        });

    this.crudservice.getusers().subscribe((ret: any[]) => {
      this.data = ret;
      //sweetalert message popup
      Swal.fire({
        title: 'Hurray!!',
        text: "User has been deleted successfully",
        icon: 'success'
      });

      $('#datatableexample').DataTable().destroy();
      this.crudservice.getusers().subscribe((ret: any[]) => {

        this.data = ret;
        //console.log(this.data);
        setTimeout(() => {
          $('#datatableexample').DataTable({
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
      myFormData.append('username', this.editForm.value.username);
      myFormData.append('email', this.editForm.value.email);
      myFormData.append('tipo', this.editForm.value.tipo);

      this.crudservice.updateuser(myFormData, this.userID)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
          },
          error => {
            console.log("error");
          });;

      //sweetalert message popup
      $("#editModal").modal("hide");
      Swal.fire({
        title: 'Hurray!!',
        text: "User has been updated successfully",
        icon: 'success'
      });

      $('#datatableexample').DataTable().destroy();
      this.crudservice.getusers().subscribe((ret: any[]) => {

        this.data = ret;

        setTimeout(() => {
          $('#datatableexample').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25],
            order: [0, "desc"]
          });
        }, 500);
      });
    }
  }

  showedituser = false;
  editForm: FormGroup;
  userID: any;
  edituser(id) {
    //user details post request
    this.crudservice.getsingleuser(id)
      .subscribe(
        data => {
          this.userdata = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });;

    setTimeout(() => {
      this.editForm.controls["username"].setValue(this.userdata.username);
      this.editForm.controls["email"].setValue(this.userdata.email);
      this.editForm.controls["tipo"].setValue(this.userdata.tipo);
      this.userID = this.userdata.idUsuario;
      this.showedituser = true;
      $("#editModal").modal("show");
    }, 500);
  }

  addClose() {
    $("#addUser").modal("hide");
  }
  editClose() {
    $("#editModal").modal("hide");
  }
}
