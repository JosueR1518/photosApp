import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(private domSinitizer:DomSanitizer){

  }

  transform(value: string, args?: any): any {

    const domImg=`background-image: url('${value}')`;
    return this.domSinitizer.bypassSecurityTrustStyle(domImg);
  }

}
