import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducto'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filtro: any): any {
    const resultadoFiltro = [];
    if(filtro !== ''){
    for(const resultado of value){
      if(resultado.nombreProducto.toLowerCase().indexOf(filtro.toLowerCase()) >-1){
        resultadoFiltro.push(resultado);
      }
    }
    return resultadoFiltro;
  }else return value;
  }

}

@Pipe({
  name: 'filterEmpleado'
})
export class FilterPipeEmpleado implements PipeTransform {

  transform(value: any, filtro: any): any {
    const resultadoFiltro = [];
    if(filtro !== ''){
    for(const resultado of value){
      if(resultado.apellidosEmpleados.toLowerCase().indexOf(filtro.toLowerCase()) >-1){
        resultadoFiltro.push(resultado);
      }
    }
    return resultadoFiltro;
  }else return value;
  }

}