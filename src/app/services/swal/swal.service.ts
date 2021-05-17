import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { callbackify } from 'util';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  aux: any;

  constructor() {

  }

  public success(msg: string) {
    Swal.fire({
      title: 'Hurray!!',
      text: msg,
      icon: 'success'
    });
  }

  public error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: 'See logs for more info'
    })
  }

  public areyousure(msg: string, callback: Function) {
    this.aux = "aaaa";

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        return callback(true);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          msg + ' data is safe :)',
          'error'
        )
        return callback(null);
      }
    })
  }
}
