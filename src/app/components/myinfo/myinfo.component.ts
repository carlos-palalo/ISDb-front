import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MyinfoService } from 'src/app/services/myinfo/myinfo.service';
import { SwalService } from 'src/app/services/swal/swal.service';
declare let $: any;

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.css']
})
export class MyinfoComponent implements OnInit {
  constructor(
    private myinfoservice: MyinfoService,
    private formBuilder: FormBuilder,
    private _swal: SwalService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.user = x);
  }

  data: any = [];
  userdata: any
  infoForm: FormGroup;
  passForm: FormGroup;
  submittedInfo = false;
  submittedPass = false;
  user;

  ngOnInit() {
    //Add form validations
    this.infoForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });

    //Edit form validations
    this.passForm = this.formBuilder.group({
      pass: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      confirm: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
    });

    //console.log(this.authenticationService.getDecodedAccessToken(this.user.token).idUsuario);
    this.myinfoservice.getusuario(this.authenticationService.getDecodedAccessToken(this.user.token).idUsuario).subscribe((ret: any[]) => {
      this.data = ret;
      this.infoForm.controls["username"].setValue(this.data.username);
      this.infoForm.controls["email"].setValue(this.data.email);
    });
  }

  get p() { return this.passForm.controls; }
  get i() { return this.infoForm.controls; }

  onSubmitInfo() {
    this.submittedInfo = true;
    // stop here if form is invalid
    if (this.infoForm.invalid) {
      console.log("Invalid");
      return;
    }
    //True if all the fields are filled
    if (this.submittedInfo) {
      // Initialize Params Object
      var myFormData = new FormData();

      // Begin assigning parameters
      myFormData.append('idUsuario', this.data.idUsuario);
      myFormData.append('username', this.infoForm.value.username);
      myFormData.append('email', this.infoForm.value.email);
      //myFormData.append('password', this.infoForm.value.password);

      this.myinfoservice.updateinfo(myFormData)
        .subscribe(
          response => {
            console.log(response);
            this.submittedInfo = true;
            this._swal.success("Information has been updated successfully");
            this.ngOnInit();
          },
          error => {
            console.log("error");
            this._swal.error();
          });;
    }
  }

  onSubmitPass() {
    this.submittedPass = true;
    // stop here if form is invalid
    if (this.passForm.invalid) {
      console.log("Invalid");
      return;
    }

    if (this.passForm.value.pass != this.passForm.value.confirm) {
      this._swal.error();
      return;
    }

    //True if all the fields are filled
    if (this.submittedPass) {
      // Initialize Params Object
      var myFormData = new FormData();

      // Begin assigning parameters
      myFormData.append('idUsuario', this.data.idUsuario);
      myFormData.append('password', this.passForm.value.password);

      this.myinfoservice.updatepass(myFormData)
        .subscribe(
          response => {
            console.log(response);
            this.submittedPass = true;
            this._swal.success("Password has been updated successfully");
            this.ngOnInit();
          },
          error => {
            console.log("error");
            this._swal.error();
          });;
    }
  }
}
