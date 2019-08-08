import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'camaraIosSanitizer'
})
export class CamaraIosSanitizerPipe implements PipeTransform {


  constructor(private domSInitizer:DomSanitizer){

  }
  transform(img: string, args?: any): any {
    return this.domSInitizer.bypassSecurityTrustUrl(img);
  }

}
