import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { CamaraIosSanitizerPipe } from './camara-ios-sanitizer.pipe';

@NgModule({
  declarations: [
    DomSanitizerPipe, 
    CamaraIosSanitizerPipe],
  imports: [
    CommonModule
  ],
  exports:[
    DomSanitizerPipe,
    CamaraIosSanitizerPipe]
})
export class PipesModule { }
