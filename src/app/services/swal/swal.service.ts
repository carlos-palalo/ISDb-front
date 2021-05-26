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
  constructor() { }

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
      text: 'Something went wrong!'
    })
  }

  public customError(msg: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg
    })
  }

  public generate(callback: Function) {
    swalWithBootstrapButtons.fire({
      title: 'Do you want to generate 3 rows?',
      text: "This will take few minutes",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, generate few rows!',
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
          'Serie data is safe :)',
          'error'
        )
        return callback(null);
      }
    })
  }

  public areyousure(msg: string, callback: Function) {
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
