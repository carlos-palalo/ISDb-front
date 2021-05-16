import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(lista: any[], value: string): any[] {
    if (!value) return null;
    return lista.filter(serie => serie.titulo.toUpperCase().includes(value.toUpperCase()));
  }

}
