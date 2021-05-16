import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appBrokenVideo]'
})
export class BrokenVideoDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('error')
  cargarImgDefault() {
    const element = this.elementRef.nativeElement
    element.src = "../../assets/img/Not_Found.png";
    //console.log("Esta imagen está rota", );
  }

}
