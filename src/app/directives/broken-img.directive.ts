import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appBrokenImg]'
})
export class BrokenImgDirective{

  constructor(private elementRef: ElementRef) { }

  @HostListener('error')
  cargarImgDefault(){
    const element = this.elementRef.nativeElement
    element.src = "../../assets/img/Not_Found.png";
    //console.log("Esta imagen está rota", );
  }
}
